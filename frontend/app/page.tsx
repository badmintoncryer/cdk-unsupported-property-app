import missingProperties from "./missingProperties.json";

export default function Home() {
	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24 bg-black">
			<div className="container mx-auto px-4">
				<h1 className="text-4xl font-bold text-center my-6 text-white">
					AWS CDK Unsupported Properties for L2 by {""}
					<a
						href="https://github.com/badmintoncryer"
						className="text-blue-400 hover:text-blue-600"
						rel="noopener noreferrer"
						target="_blank"
					>
						@badmintoncryer
					</a>
				</h1>
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
