"use client";

import { useState } from "react";
import missingProperties from "./missingProperties.json";

type MissingProperty = {
	module: string;
	name: string;
	missingProps: string[];
};

export default function Home() {
	const [showTags, setShowTags] = useState(false);
	const initialData: MissingProperty[] = [];
	// missingPropsから'tags'を削除し、その結果要素数が0になった項目を取り除く
	const processedData = missingProperties.reduce((acc, item) => {
		// 'tags'を除外する
		const filteredProps = showTags
			? item.missingProps
			: item.missingProps.filter((prop) => prop !== "tags");

		// filteredPropsが空でなければ、新しい配列に追加
		if (filteredProps.length > 0) {
			acc.push({
				...item,
				missingProps: filteredProps,
			});
		}

		return acc;
	}, initialData);

  const buildTime = process.env.BUILD_TIME ? new Date(process.env.BUILD_TIME) : new Date(12345677890);
  const formattedBuildTime = buildTime.toLocaleString('ja-JP', {
    year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', second: '2-digit'
  });

	return (
		<main className="flex flex-col min-h-screen justify-between p-4 sm:p-24 bg-black">
			<h1 className="text-xl sm:text-3xl font-bold mb-6 text-center">
				AWS CDK L2 Constructs Unsupported Properties{" "}
				<a
					href="https://github.com/badmintoncryer"
					className="text-blue-400 hover:text-blue-600"
					rel="noopener noreferrer"
					target="_blank"
				>
					@badmintoncryer
				</a>
			</h1>
      <p className="text-sm sm:text-base text-center text-gray-400 mb-6">
        Last Updated: {formattedBuildTime}
      </p>
			<div className="container mx-auto">
				<div className="text-white p-4 rounded-lg shadow mb-6 bg-gray-800">
					<div className="flex items-center justify-end">
						<label
							htmlFor="toggle"
							className="text-white text-sm sm:text-base mr-4"
						>
							Show `tags` Prop
						</label>
						<div className="relative inline-block w-10 align-middle select-none transition duration-200 ease-in">
							<input
								type="checkbox"
								name="toggle"
								id="toggle"
								className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
								checked={showTags}
								onChange={() => setShowTags(!showTags)}
							/>
							<label
								htmlFor="toggle"
								className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
							/>
						</div>
					</div>

					<p className="text-sm sm:text-base mb-4">
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
					<p className="text-sm sm:text-base mb-4 italic">
						Currently, only support direct inline props properly, and cases
						using the spread operator are{" "}
						<span className="text-red-500">not</span> supported. Even if they
						are actually supported in L2, they are still counted as unsupported
						properties.
					</p>
					<div className="flex flex-col sm:flex-row justify-center items-start gap-4">
						<div className="flex-1 p-4 bg-gray-800 rounded-lg">
							<h2 className="text-base sm:text-lg font-bold text-blue-400 mb-2">
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
						<div className="flex-1 p-4 bg-gray-800 rounded-lg">
							<h2 className="text-base sm:text-lg font-bold text-red-400 mb-2">
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

				{processedData
					.sort((a, b) => {
						const moduleCompare = a.module.localeCompare(b.module);
						if (moduleCompare !== 0) {
							return moduleCompare;
						}
						return a.name.localeCompare(b.name);
					})
					.map((item) => (
						<div
							key={item.module + item.name}
							className="mb-5 p-4 shadow-lg rounded-lg bg-gray-800"
						>
							<h2 className="text-xl sm:text-2xl font-semibold text-white">
								{item.module} - {item.name}
							</h2>
							<ul className="list-disc list-inside text-gray-300">
								{item.missingProps.map((prop) => (
									<li key={prop} className="text-lg">
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
