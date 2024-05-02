import Image from "next/image";
import missingProperties from "./missingProperties.json";

export default function Home() {
	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24">
			<div className="container mx-auto px-4">
				<h1 className="text-2xl font-bold text-center my-6">
					AWS Resources Missing Properties
				</h1>
				{missingProperties.map((item, index) => (
					<div key={index} className="mb-5 p-4 shadow-lg rounded-lg">
						<h2 className="text-xl font-semibold">
							{item.module} - {item.name}
						</h2>
						<ul className="list-disc list-inside">
							{item.missingProps.map((prop, idx) => (
								<li key={idx} className="text-gray-700">
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
