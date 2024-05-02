import missingProperties from "./missingProperties.json";

export default function Home() {
	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24 bg-black">
			<div className="container mx-auto px-4">
				<div className="bg-gray-800 text-white p-6 rounded-lg shadow mb-6">
					<h1 className="text-lg font-bold mb-2">
						AWS CDK L2 Constructs Unsupported Arguments {""}
						<a
							href="https://github.com/badmintoncryer"
							className="text-blue-400 hover:text-blue-600"
							rel="noopener noreferrer"
							target="_blank"
						>
							@badmintoncryer
						</a>
					</h1>
					<p className="mb-4">
						This page displays a list of unsupported arguments in AWS CDK L2
						constructs. For more details, visit{" "}
						<a
							href="https://speakerdeck.com/badmintoncryer/cdkkontoribiyutonozui-chu-nobi-woyue-eyou-jian-dan-issuenojian-tukefang"
							className="text-blue-400 hover:text-blue-600"
							rel="noopener noreferrer"
							target="_blank"
						>
							this reference
						</a>
						.
					</p>
					<p className="italic">
						Note: The following example, where arguments are indirectly passed,
						is <span className="text-red-500">not</span> currently supported.
						Although it might appear as unsupported, it is actually handled.
					</p>
					<pre className="bg-gray-700 p-4 rounded">
						<code>
							{`const props = {
  hoge: 'hoge',
  fuga: 123,
};

new CfnConstruct(scope, 'Resource', {
  ...props,
});`}
						</code>
					</pre>
				</div>

				{missingProperties.map((item, index) => (
					<div
						key={index}
						className="mb-5 p-4 shadow-lg rounded-lg bg-gray-800"
					>
						<h2 className="text-2xl font-semibold text-white">
							{item.module} - {item.name}
						</h2>
						<ul className="list-disc list-inside text-gray-300">
							{item.missingProps.map((prop, idx) => (
								<li key={idx} className="text-lg">
									{prop}
								</li>
							))}
						</ul>
					</div>
				))}
			</div>
		</main>
	);
}
