import missingProperties from "./missingProperties.json";

export default function Home() {
	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24 bg-black">
			<h1 className="text-3xl font-bold mb-6">
				AWS CDK L2 Constructs Unsupported Properties {""}
				<a
					href="https://github.com/badmintoncryer"
					className="text-blue-400 hover:text-blue-600"
					rel="noopener noreferrer"
					target="_blank"
				>
					@badmintoncryer
				</a>
			</h1>
			<div className="container mx-auto px-4">
				<div className="bg-gray-800 text-white p-6 rounded-lg shadow mb-6">
					<p className="mb-4">
						This page displays a list of unsupported properties in AWS CDK L2
						constructs. For more details, visit{" "}
						<a
							href="https://speakerdeck.com/badmintoncryer/cdkkontoribiyutonozui-chu-nobi-woyue-eyou-jian-dan-issuenojian-tukefang"
							className="text-blue-400 hover:text-blue-600"
							rel="noopener noreferrer"
							target="_blank"
						>
							this materials
						</a>
						.
					</p>
					<p className="mb-4">
          Currently, only support direct inline props properly, and cases using the spread operator are <span className="text-red-500">not</span> supported.
          Even if they are actually supported in L2, they are still counted as unsupported properties.
					</p>
					<div className="flex flex-wrap justify-center items-start gap-4 p-5 bg-black">
						<div className="flex-1 p-4 bg-gray-800 text-white rounded-lg">
							<h2 className="text-lg font-bold text-blue-400 mb-2">
								Direct Inline Props
							</h2>
							<pre className="whitespace-pre-wrap">
								<code>
									{`new CfnConstruct(scope, 'Resource', {
  hoge: 'hoge',
  fuga: 123,
});`}
								</code>
							</pre>
						</div>
						<div className="flex-1 p-4 bg-gray-800 text-white rounded-lg">
							<h2 className="text-lg font-bold text-red-400 mb-2">
								Spread operator Props (false positive)
							</h2>
							<pre className="whitespace-pre-wrap">
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
					</div>
				</div>

				{missingProperties
					.sort((a, b) => {
						const moduleCompare = a.module.localeCompare(b.module);
						if (moduleCompare !== 0) {
							return moduleCompare;
						}
						return a.name.localeCompare(b.name);
					})
					.map((item, index) => (
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
