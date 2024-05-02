import * as fs from "node:fs";
import * as path from "node:path";
import * as cdk from "aws-cdk-lib";
import type { Construct } from "constructs";
import * as cloudfront from "aws-cdk-lib/aws-cloudfront";
import * as cloudfrontOrigins from "aws-cdk-lib/aws-cloudfront-origins";
import * as iam from "aws-cdk-lib/aws-iam";
import * as s3 from "aws-cdk-lib/aws-s3";
import * as s3deploy from "aws-cdk-lib/aws-s3-deployment";

const JSON_FILE_NAME = "missingProperties.json";

export class CdkUnsupportedPropertyAppStack extends cdk.Stack {
	constructor(scope: Construct, id: string, props?: cdk.StackProps) {
		super(scope, id, props);

		const bucket = new s3.Bucket(this, "MyBucket", {
			removalPolicy: cdk.RemovalPolicy.DESTROY,
		});

		// OAC
		const cfnOriginAccessControl = new cloudfront.CfnOriginAccessControl(
			this,
			"OriginAccessControl",
			{
				originAccessControlConfig: {
					name: "OriginAccessControlForContentsBucket",
					originAccessControlOriginType: "s3",
					signingBehavior: "always",
					signingProtocol: "sigv4",
					description: "Access Control",
				},
			},
		);

		// Cloudfront(distribution)
		const origin = new cloudfrontOrigins.S3Origin(bucket);
		const distribution = new cloudfront.Distribution(this, "DistributionId", {
			defaultRootObject: "JSON_FILE_NAME",
			defaultBehavior: {
				origin: origin,
			},
		});

		// Policy
		const bucketPolicyStatement = new iam.PolicyStatement({
			actions: ["s3:GetObject"],
			effect: iam.Effect.ALLOW,
			principals: [new iam.ServicePrincipal("cloudfront.amazonaws.com")],
			resources: [`${bucket.bucketArn}/*`],
		});
		bucketPolicyStatement.addCondition("StringEquals", {
			"AWS:SourceArn": `arn:aws:cloudfront::${
				cdk.Stack.of(this).account
			}:distribution/${distribution.distributionId}`,
		});
		bucket.addToResourcePolicy(bucketPolicyStatement);

		const cfnDistribution = distribution.node
			.defaultChild as cloudfront.CfnDistribution;
		cfnDistribution.addPropertyOverride(
			"DistributionConfig.Origins.0.OriginAccessControlId",
			cfnOriginAccessControl.getAtt("Id"),
		);
		cfnDistribution.addPropertyOverride(
			"DistributionConfig.Origins.0.DomainName",
			bucket.bucketRegionalDomainName,
		);
		cfnDistribution.addOverride(
			"Properties.DistributionConfig.Origins.0.S3OriginConfig.OriginAccessIdentity",
			"",
		);
		cfnDistribution.addPropertyDeletionOverride(
			"DistributionConfig.Origins.0.CustomOriginConfig",
		);

		const jsonData = fs.readFileSync(
			path.join(__dirname, `../${JSON_FILE_NAME}`),
			"utf8",
		);

		new s3deploy.BucketDeployment(this, "DeployJson", {
			sources: [s3deploy.Source.jsonData(JSON_FILE_NAME, jsonData)],
			destinationBucket: bucket,
      distribution,
      distributionPaths: ['/*'],
		});

		new cdk.CfnOutput(this, "CloudfrontDomainName", {
      value: distribution.distributionDomainName,
    });
	}
}
