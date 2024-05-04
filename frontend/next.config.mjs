import { PHASE_PRODUCTION_BUILD } from 'next/constants.js';

/** @type {import('next').NextConfig} */
const nextConfig = (phase) => {
  if (phase === PHASE_PRODUCTION_BUILD) {
    // ビルド時の日時を取得
    const buildDate = new Date().toISOString();

    return {
      output: "export",
      env: {
        BUILD_TIME: buildDate
      }
    };
  }

  return {
    output: "export"
  };
};

export default nextConfig;
