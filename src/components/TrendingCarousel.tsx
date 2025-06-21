'use client';

import { fetchTrendingAnime } from '../lib/aniwatchApi';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function TrendingCarousel() {
	const [trending, setTrending] = useState<any[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	useEffect(() => {
		setLoading(true);
		fetchTrendingAnime()
			.then(data => {
				setTrending(data);
				setError(null);
			})
			.catch(() => setError('Failed to load trending anime.'))
			.finally(() => setLoading(false));
	}, []);

	if (loading) {
		return (
			<section className="py-6">
				<h2 className="text-xl font-bold mb-4 text-neon">Trending Now</h2>
				<div className="flex gap-6 overflow-x-auto no-scrollbar">
					{[...Array(4)].map((_, i) => (
						<div
							key={i}
							className="min-w-[220px] h-56 bg-gray-800 rounded-lg animate-pulse"
						/>
					))}
				</div>
			</section>
		);
	}
	if (error) {
		return <div className="text-red-400 py-6">{error}</div>;
	}

	return (
		<section className="py-6">
			<h2 className="text-xl font-bold mb-4 text-neon">Trending Now</h2>
			<div className="flex gap-6 overflow-x-auto no-scrollbar">
				{trending.map(anime => (
					<motion.div
						key={anime.id}
						whileHover={{ scale: 1.08 }}
						className="min-w-[220px] bg-gray-900 rounded-lg shadow-lg overflow-hidden cursor-pointer transition-all"
					>
						<img
							src={anime.image || anime.coverImage}
							alt={anime.title}
							className="w-full h-40 object-cover"
							loading="lazy"
						/>
						<div className="p-3">
							<span className="font-semibold text-white">{anime.title}</span>
						</div>
					</motion.div>
				))}
			</div>
		</section>
	);
}
