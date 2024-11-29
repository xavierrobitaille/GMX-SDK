import { BigNumber } from "ethers";

import { usePositionsInfo } from "../src/gmx/domain/synthetics/positions"

import { useMarketsInfo } from "../src/gmx/domain/synthetics/markets"

// Helper function to recursively transform objects
function toSerializable(obj: any): any {
    if (BigNumber.isBigNumber(obj)) {
        return obj.toString(); // Convert BigNumber to string
    }
    if (Array.isArray(obj)) {
        return obj.map(toSerializable); // Recursively process arrays
    }
    if (obj && typeof obj === "object") {
        return Object.keys(obj).reduce((acc, key) => {
            acc[key] = toSerializable(obj[key]);
            return acc;
        }, {} as Record<string, any>);
    }
    return obj; // Return primitive values as-is
}


describe("positions", () => {
    it("pos1", async () => {
        const chainId = 42161;
        const account = "0x23B27875ad09d21517101a7f83499C38F7eC2D2a";
        const markets = await useMarketsInfo(chainId, account);
        const positions = await usePositionsInfo(chainId, {
            account: account,
            marketsInfoData: markets.marketsInfoData,
            tokensData: markets.tokensData,
            showPnlInLeverage: false,
        });

        // Serialize positions
        const serializablePositions = toSerializable(positions.positionsInfoData);

        console.log(JSON.stringify(serializablePositions, null, 2));

        // Iterate over positionsInfoData
        Object.entries(serializablePositions).forEach(([key, position]) => {
            // Type assertion for position
            const pos = position as {
                marketInfo: {
                    longToken: {
                        decimals: number;
                        prices: { minPrice: string };
                    };
                };
                claimableLongTokenAmount: string;
                pendingClaimableFundingFeesUsd: string;
            };

            const longToken = pos.marketInfo?.longToken;
            const claimableLongTokenAmount = pos.claimableLongTokenAmount;

            if (longToken && claimableLongTokenAmount && longToken.prices.minPrice) {

                console.log(
                    `Position Key: ${key}, Pending Claimable Funding Fees (Long USD): ${Number(pos.pendingClaimableFundingFeesUsd) / (10**30)}`
                );
            } else {
                console.log(
                    `Position Key: ${key} is missing required data for calculation.`
                );
            }
        });

        expect(positions).not.toBeNull();
    }, 1e6);
});
