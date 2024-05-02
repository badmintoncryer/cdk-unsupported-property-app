# CDK Unsupported Property App

https://d1upnzw71mlot9.cloudfront.net/

## Description

This page displays a list of unsupported properties in AWS CDK L2 constructs. For more details, visit this `materials`.

Note: The following example, where arguments are indirectly passed, is not currently supported. Although it might appear as unsupported, it is actually handled.

const props = {
  hoge: 'hoge',
  fuga: 123,
};

new CfnConstruct(scope, 'Resource', {
  ...props,
});