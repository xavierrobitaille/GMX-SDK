import { BigNumber } from 'ethers'

import { useMarketsInfo } from '../src/gmx/domain/synthetics/markets'
import { usePositionsInfo } from '../src/gmx/domain/synthetics/positions'

import { ethers } from 'ethers'

// Use default import for CommonJS modules
import ff from 'ffpublic'

const gmxPositionsInfo = {
  '0x8E1E8AA0deD409Aa6cA3E37E76239e3E3ff70BdF:0x47c031236e19d024b42f8AE6780E44A573170703:0x2f2a2543B76A4166549F7aaB2e75Bef0aefC5B0f:false': {
    key:
      '0x8E1E8AA0deD409Aa6cA3E37E76239e3E3ff70BdF:0x47c031236e19d024b42f8AE6780E44A573170703:0x2f2a2543B76A4166549F7aaB2e75Bef0aefC5B0f:false',
    contractKey: '0x7a24b823b16fff7308e3dfb137192937e7ed3138717b1938c7ce1e9b83957e9a',
    account: '0x8E1E8AA0deD409Aa6cA3E37E76239e3E3ff70BdF',
    marketAddress: '0x47c031236e19d024b42f8AE6780E44A573170703',
    collateralTokenAddress: '0x2f2a2543B76A4166549F7aaB2e75Bef0aefC5B0f',
    sizeInUsd: '10172042486306296345521726200000000',
    sizeInTokens: '10989101',
    collateralAmount: '10978556',
    increasedAtBlock: '275562245',
    decreasedAtBlock: '0',
    isLong: false,
    pendingBorrowingFeesUsd: '14898859117089373706094602821834',
    fundingFeeAmount: '0',
    claimableLongTokenAmount: '2047',
    claimableShortTokenAmount: '22983134',
    marketInfo: {
      marketTokenAddress: '0x47c031236e19d024b42f8AE6780E44A573170703',
      indexTokenAddress: '0x47904963fc8b2340414262125aF798B9655E58Cd',
      longTokenAddress: '0x2f2a2543B76A4166549F7aaB2e75Bef0aefC5B0f',
      shortTokenAddress: '0xaf88d065e77c8cC2239327C5EDb3A432268e5831',
      isSameCollaterals: false,
      isSpotOnly: false,
      name: 'BTC/USD [BTC-USDC]',
      data: '',
      isDisabled: false,
      longToken: {
        name: 'Bitcoin (WBTC)',
        symbol: 'BTC',
        assetSymbol: 'WBTC',
        decimals: 8,
        address: '0x2f2a2543B76A4166549F7aaB2e75Bef0aefC5B0f',
        isShortable: true,
        imageUrl: 'https://assets.coingecko.com/coins/images/26115/thumb/btcb.png?1655921693',
        coingeckoUrl: 'https://www.coingecko.com/en/coins/wrapped-bitcoin',
        explorerUrl: 'https://arbiscan.io/address/0x2f2a2543b76a4166549f7aab2e75bef0aefc5b0f',
        isV1Available: true,
        prices: {
          minPrice: '96904484000000000000000000000000000',
          maxPrice: '96907228853725830000000000000000000'
        },
        balance: '0'
      },
      shortToken: {
        name: 'USD Coin',
        symbol: 'USDC',
        decimals: 6,
        address: '0xaf88d065e77c8cC2239327C5EDb3A432268e5831',
        isStable: true,
        isV1Available: true,
        imageUrl: 'https://assets.coingecko.com/coins/images/6319/thumb/USD_Coin_icon.png?1547042389',
        coingeckoUrl: 'https://www.coingecko.com/en/coins/usd-coin',
        explorerUrl: 'https://arbiscan.io/address/0xaf88d065e77c8cC2239327C5EDb3A432268e5831',
        prices: {
          minPrice: '999888228864973000000000000000',
          maxPrice: '999988293009945200000000000000'
        },
        balance: '0'
      },
      indexToken: {
        name: 'Bitcoin',
        symbol: 'BTC',
        address: '0x47904963fc8b2340414262125aF798B9655E58Cd',
        isSynthetic: true,
        decimals: 8,
        imageUrl: 'https://assets.coingecko.com/coins/images/1/small/bitcoin.png?1547033579',
        explorerUrl: 'https://arbiscan.io/address/0x2f2a2543b76a4166549f7aab2e75bef0aefc5b0f',
        coingeckoUrl: 'https://www.coingecko.com/en/coins/bitcoin',
        prices: {
          minPrice: '96904484000000000000000000000000000',
          maxPrice: '96907228853725830000000000000000000'
        },
        balance: '0'
      },
      longInterestUsd: '41293890357136550555622885763832134402',
      shortInterestUsd: '46974101557137516187556617194142411072',
      longInterestInTokens: '51923763078',
      shortInterestInTokens: '60148084103',
      longPoolAmount: '63263551853',
      shortPoolAmount: '58029235101834',
      maxLongPoolAmountForDeposit: '200000000000',
      maxShortPoolAmountForDeposit: '100000000000000',
      maxLongPoolAmount: '220000000000',
      maxShortPoolAmount: '110000000000000',
      longPoolAmountAdjustment: '0',
      shortPoolAmountAdjustment: '0',
      poolValueMin: '120369596639371068151855183678048174903',
      poolValueMax: '120380262679111001063109042892848174903',
      reserveFactorLong: '1750000000000000000000000000000',
      reserveFactorShort: '1750000000000000000000000000000',
      openInterestReserveFactorLong: '1700000000000000000000000000000',
      openInterestReserveFactorShort: '1700000000000000000000000000000',
      maxOpenInterestLong: '83089000000000000000000000000000000000',
      maxOpenInterestShort: '83089000000000000000000000000000000000',
      totalBorrowingFees: '638180989800841864772349248188018370',
      positionImpactPoolAmount: '1701136660',
      minPositionImpactPoolAmount: '95000000',
      positionImpactPoolDistributionRate: '0',
      swapImpactPoolAmountLong: '133224923',
      swapImpactPoolAmountShort: '1411136667',
      borrowingFactorLong: '6250000000000000000000',
      borrowingFactorShort: '6250000000000000000000',
      borrowingExponentFactorLong: '1000000000000000000000000000000',
      borrowingExponentFactorShort: '1000000000000000000000000000000',
      fundingFactor: '20000000000000000000000',
      fundingExponentFactor: '1000000000000000000000000000000',
      fundingIncreaseFactorPerSecond: '1761655110209143694',
      fundingDecreaseFactorPerSecond: '0',
      thresholdForDecreaseFunding: '0',
      thresholdForStableFunding: '40000000000000000000000000000',
      minFundingFactorPerSecond: '317097919837645865043',
      maxFundingFactorPerSecond: '19025875190258751902587',
      pnlLongMax: '9022564326981866964377114236167865598',
      pnlLongMin: '9023989558327304589266161636167865598',
      pnlShortMax: '-11313739955688178889878187705857588928',
      pnlShortMin: '-11312088978760662332443382805857588928',
      netPnlMax: '-2291175628706311925501073469689723330',
      netPnlMin: '-2288099420433357743177221169689723330',
      maxPnlFactorForTradersLong: '900000000000000000000000000000',
      maxPnlFactorForTradersShort: '900000000000000000000000000000',
      minCollateralFactor: '5000000000000000000000000000',
      minCollateralFactorForOpenInterestLong: '60000000000000000000',
      minCollateralFactorForOpenInterestShort: '60000000000000000000',
      claimableFundingAmountLong: '12041',
      claimableFundingAmountShort: '66928845',
      positionFeeFactorForPositiveImpact: '500000000000000000000000000',
      positionFeeFactorForNegativeImpact: '700000000000000000000000000',
      positionImpactFactorPositive: '30000000000000000000',
      positionImpactFactorNegative: '90000000000000000000',
      maxPositionImpactFactorPositive: '5000000000000000000000000000',
      maxPositionImpactFactorNegative: '5000000000000000000000000000',
      maxPositionImpactFactorForLiquidations: '0',
      positionImpactExponentFactor: '2000000000000000000000000000000',
      swapFeeFactorForPositiveImpact: '500000000000000000000000000',
      swapFeeFactorForNegativeImpact: '700000000000000000000000000',
      swapImpactFactorPositive: '200000000000000000000',
      swapImpactFactorNegative: '400000000000000000000',
      swapImpactExponentFactor: '2000000000000000000000000000000',
      borrowingFactorPerSecondForLongs: '0',
      borrowingFactorPerSecondForShorts: '5059879775496524507097',
      fundingFactorPerSecond: '3920307161003127805625',
      longsPayShorts: true,
      virtualPoolAmountForLongToken: '64187174890',
      virtualPoolAmountForShortToken: '58876300719118',
      virtualInventoryForPositions: '10611087298170777190969176663618314376',
      virtualMarketId: '0xba1ff14bf93fbb00b6f43d3ad403cc4c6496c1bb88489075c8b1bc709bde9ebb',
      virtualLongTokenId: '0x0000000000000000000000000000000000000000000000000000000000000000',
      virtualShortTokenId: '0x0000000000000000000000000000000000000000000000000000000000000000'
    },
    indexToken: {
      name: 'Bitcoin',
      symbol: 'BTC',
      address: '0x47904963fc8b2340414262125aF798B9655E58Cd',
      isSynthetic: true,
      decimals: 8,
      imageUrl: 'https://assets.coingecko.com/coins/images/1/small/bitcoin.png?1547033579',
      explorerUrl: 'https://arbiscan.io/address/0x2f2a2543b76a4166549f7aab2e75bef0aefc5b0f',
      coingeckoUrl: 'https://www.coingecko.com/en/coins/bitcoin',
      prices: {
        minPrice: '96904484000000000000000000000000000',
        maxPrice: '96907228853725830000000000000000000'
      },
      balance: '0'
    },
    collateralToken: {
      name: 'Bitcoin (WBTC)',
      symbol: 'BTC',
      assetSymbol: 'WBTC',
      decimals: 8,
      address: '0x2f2a2543B76A4166549F7aaB2e75Bef0aefC5B0f',
      isShortable: true,
      imageUrl: 'https://assets.coingecko.com/coins/images/26115/thumb/btcb.png?1655921693',
      coingeckoUrl: 'https://www.coingecko.com/en/coins/wrapped-bitcoin',
      explorerUrl: 'https://arbiscan.io/address/0x2f2a2543b76a4166549f7aab2e75bef0aefc5b0f',
      isV1Available: true,
      prices: {
        minPrice: '96904484000000000000000000000000000',
        maxPrice: '96907228853725830000000000000000000'
      },
      balance: '0'
    },
    pnlToken: {
      name: 'USD Coin',
      symbol: 'USDC',
      decimals: 6,
      address: '0xaf88d065e77c8cC2239327C5EDb3A432268e5831',
      isStable: true,
      isV1Available: true,
      imageUrl: 'https://assets.coingecko.com/coins/images/6319/thumb/USD_Coin_icon.png?1547042389',
      coingeckoUrl: 'https://www.coingecko.com/en/coins/usd-coin',
      explorerUrl: 'https://arbiscan.io/address/0xaf88d065e77c8cC2239327C5EDb3A432268e5831',
      prices: {
        minPrice: '999888228864973000000000000000',
        maxPrice: '999988293009945200000000000000'
      },
      balance: '0'
    },
    markPrice: '96907228853725830000000000000000000',
    entryPrice: '92564828426877652189398625000000000',
    liquidationPrice: '95772052963653495330926104863300000000',
    collateralUsd: '10638713042451040000000000000000000',
    remainingCollateralUsd: '10623814183333950626293905397178166',
    remainingCollateralAmount: '10963181',
    hasLowCollateral: false,
    leverage: '9574',
    leverageWithPnl: '10025',
    pnl: '-477190768730777376266573800000000',
    pnlPercentage: '-448',
    pnlAfterFees: '-497175649091019898145429265921834',
    pnlAfterFeesPercentage: '-467',
    netValue: '10141537393360020101854570734078166',
    closingFeeUsd: '5086021243153148172760863100000',
    pendingFundingFeesUsd: '0',
    pendingClaimableFundingFeesUsd: '24964199936506342365382000000000'
  },
  '0x8E1E8AA0deD409Aa6cA3E37E76239e3E3ff70BdF:0x47c031236e19d024b42f8AE6780E44A573170703:0xaf88d065e77c8cC2239327C5EDb3A432268e5831:false': {
    key:
      '0x8E1E8AA0deD409Aa6cA3E37E76239e3E3ff70BdF:0x47c031236e19d024b42f8AE6780E44A573170703:0xaf88d065e77c8cC2239327C5EDb3A432268e5831:false',
    contractKey: '0x1f0c3b046a4e1ea760633b9f2cdfb71deec5bec83863d846497f6d267e8e0f08',
    account: '0x8E1E8AA0deD409Aa6cA3E37E76239e3E3ff70BdF',
    marketAddress: '0x47c031236e19d024b42f8AE6780E44A573170703',
    collateralTokenAddress: '0xaf88d065e77c8cC2239327C5EDb3A432268e5831',
    sizeInUsd: '14062837143205733245721158500000',
    sizeInTokens: '15543',
    collateralAmount: '14056076',
    increasedAtBlock: '275222389',
    decreasedAtBlock: '0',
    isLong: false,
    pendingBorrowingFeesUsd: '70183112541017517638444273228',
    fundingFeeAmount: '0',
    claimableLongTokenAmount: '40',
    claimableShortTokenAmount: '229107',
    marketInfo: {
      marketTokenAddress: '0x47c031236e19d024b42f8AE6780E44A573170703',
      indexTokenAddress: '0x47904963fc8b2340414262125aF798B9655E58Cd',
      longTokenAddress: '0x2f2a2543B76A4166549F7aaB2e75Bef0aefC5B0f',
      shortTokenAddress: '0xaf88d065e77c8cC2239327C5EDb3A432268e5831',
      isSameCollaterals: false,
      isSpotOnly: false,
      name: 'BTC/USD [BTC-USDC]',
      data: '',
      isDisabled: false,
      longToken: {
        name: 'Bitcoin (WBTC)',
        symbol: 'BTC',
        assetSymbol: 'WBTC',
        decimals: 8,
        address: '0x2f2a2543B76A4166549F7aaB2e75Bef0aefC5B0f',
        isShortable: true,
        imageUrl: 'https://assets.coingecko.com/coins/images/26115/thumb/btcb.png?1655921693',
        coingeckoUrl: 'https://www.coingecko.com/en/coins/wrapped-bitcoin',
        explorerUrl: 'https://arbiscan.io/address/0x2f2a2543b76a4166549f7aab2e75bef0aefc5b0f',
        isV1Available: true,
        prices: {
          minPrice: '96904484000000000000000000000000000',
          maxPrice: '96907228853725830000000000000000000'
        },
        balance: '0'
      },
      shortToken: {
        name: 'USD Coin',
        symbol: 'USDC',
        decimals: 6,
        address: '0xaf88d065e77c8cC2239327C5EDb3A432268e5831',
        isStable: true,
        isV1Available: true,
        imageUrl: 'https://assets.coingecko.com/coins/images/6319/thumb/USD_Coin_icon.png?1547042389',
        coingeckoUrl: 'https://www.coingecko.com/en/coins/usd-coin',
        explorerUrl: 'https://arbiscan.io/address/0xaf88d065e77c8cC2239327C5EDb3A432268e5831',
        prices: {
          minPrice: '999888228864973000000000000000',
          maxPrice: '999988293009945200000000000000'
        },
        balance: '0'
      },
      indexToken: {
        name: 'Bitcoin',
        symbol: 'BTC',
        address: '0x47904963fc8b2340414262125aF798B9655E58Cd',
        isSynthetic: true,
        decimals: 8,
        imageUrl: 'https://assets.coingecko.com/coins/images/1/small/bitcoin.png?1547033579',
        explorerUrl: 'https://arbiscan.io/address/0x2f2a2543b76a4166549f7aab2e75bef0aefc5b0f',
        coingeckoUrl: 'https://www.coingecko.com/en/coins/bitcoin',
        prices: {
          minPrice: '96904484000000000000000000000000000',
          maxPrice: '96907228853725830000000000000000000'
        },
        balance: '0'
      },
      longInterestUsd: '41293890357136550555622885763832134402',
      shortInterestUsd: '46974101557137516187556617194142411072',
      longInterestInTokens: '51923763078',
      shortInterestInTokens: '60148084103',
      longPoolAmount: '63263551853',
      shortPoolAmount: '58029235101834',
      maxLongPoolAmountForDeposit: '200000000000',
      maxShortPoolAmountForDeposit: '100000000000000',
      maxLongPoolAmount: '220000000000',
      maxShortPoolAmount: '110000000000000',
      longPoolAmountAdjustment: '0',
      shortPoolAmountAdjustment: '0',
      poolValueMin: '120369596639371068151855183678048174903',
      poolValueMax: '120380262679111001063109042892848174903',
      reserveFactorLong: '1750000000000000000000000000000',
      reserveFactorShort: '1750000000000000000000000000000',
      openInterestReserveFactorLong: '1700000000000000000000000000000',
      openInterestReserveFactorShort: '1700000000000000000000000000000',
      maxOpenInterestLong: '83089000000000000000000000000000000000',
      maxOpenInterestShort: '83089000000000000000000000000000000000',
      totalBorrowingFees: '638180989800841864772349248188018370',
      positionImpactPoolAmount: '1701136660',
      minPositionImpactPoolAmount: '95000000',
      positionImpactPoolDistributionRate: '0',
      swapImpactPoolAmountLong: '133224923',
      swapImpactPoolAmountShort: '1411136667',
      borrowingFactorLong: '6250000000000000000000',
      borrowingFactorShort: '6250000000000000000000',
      borrowingExponentFactorLong: '1000000000000000000000000000000',
      borrowingExponentFactorShort: '1000000000000000000000000000000',
      fundingFactor: '20000000000000000000000',
      fundingExponentFactor: '1000000000000000000000000000000',
      fundingIncreaseFactorPerSecond: '1761655110209143694',
      fundingDecreaseFactorPerSecond: '0',
      thresholdForDecreaseFunding: '0',
      thresholdForStableFunding: '40000000000000000000000000000',
      minFundingFactorPerSecond: '317097919837645865043',
      maxFundingFactorPerSecond: '19025875190258751902587',
      pnlLongMax: '9022564326981866964377114236167865598',
      pnlLongMin: '9023989558327304589266161636167865598',
      pnlShortMax: '-11313739955688178889878187705857588928',
      pnlShortMin: '-11312088978760662332443382805857588928',
      netPnlMax: '-2291175628706311925501073469689723330',
      netPnlMin: '-2288099420433357743177221169689723330',
      maxPnlFactorForTradersLong: '900000000000000000000000000000',
      maxPnlFactorForTradersShort: '900000000000000000000000000000',
      minCollateralFactor: '5000000000000000000000000000',
      minCollateralFactorForOpenInterestLong: '60000000000000000000',
      minCollateralFactorForOpenInterestShort: '60000000000000000000',
      claimableFundingAmountLong: '12041',
      claimableFundingAmountShort: '66928845',
      positionFeeFactorForPositiveImpact: '500000000000000000000000000',
      positionFeeFactorForNegativeImpact: '700000000000000000000000000',
      positionImpactFactorPositive: '30000000000000000000',
      positionImpactFactorNegative: '90000000000000000000',
      maxPositionImpactFactorPositive: '5000000000000000000000000000',
      maxPositionImpactFactorNegative: '5000000000000000000000000000',
      maxPositionImpactFactorForLiquidations: '0',
      positionImpactExponentFactor: '2000000000000000000000000000000',
      swapFeeFactorForPositiveImpact: '500000000000000000000000000',
      swapFeeFactorForNegativeImpact: '700000000000000000000000000',
      swapImpactFactorPositive: '200000000000000000000',
      swapImpactFactorNegative: '400000000000000000000',
      swapImpactExponentFactor: '2000000000000000000000000000000',
      borrowingFactorPerSecondForLongs: '0',
      borrowingFactorPerSecondForShorts: '5059879775496524507097',
      fundingFactorPerSecond: '3920307161003127805625',
      longsPayShorts: true,
      virtualPoolAmountForLongToken: '64187174890',
      virtualPoolAmountForShortToken: '58876300719118',
      virtualInventoryForPositions: '10611087298170777190969176663618314376',
      virtualMarketId: '0xba1ff14bf93fbb00b6f43d3ad403cc4c6496c1bb88489075c8b1bc709bde9ebb',
      virtualLongTokenId: '0x0000000000000000000000000000000000000000000000000000000000000000',
      virtualShortTokenId: '0x0000000000000000000000000000000000000000000000000000000000000000'
    },
    indexToken: {
      name: 'Bitcoin',
      symbol: 'BTC',
      address: '0x47904963fc8b2340414262125aF798B9655E58Cd',
      isSynthetic: true,
      decimals: 8,
      imageUrl: 'https://assets.coingecko.com/coins/images/1/small/bitcoin.png?1547033579',
      explorerUrl: 'https://arbiscan.io/address/0x2f2a2543b76a4166549f7aab2e75bef0aefc5b0f',
      coingeckoUrl: 'https://www.coingecko.com/en/coins/bitcoin',
      prices: {
        minPrice: '96904484000000000000000000000000000',
        maxPrice: '96907228853725830000000000000000000'
      },
      balance: '0'
    },
    collateralToken: {
      name: 'USD Coin',
      symbol: 'USDC',
      decimals: 6,
      address: '0xaf88d065e77c8cC2239327C5EDb3A432268e5831',
      isStable: true,
      isV1Available: true,
      imageUrl: 'https://assets.coingecko.com/coins/images/6319/thumb/USD_Coin_icon.png?1547042389',
      coingeckoUrl: 'https://www.coingecko.com/en/coins/usd-coin',
      explorerUrl: 'https://arbiscan.io/address/0xaf88d065e77c8cC2239327C5EDb3A432268e5831',
      prices: {
        minPrice: '999888228864973000000000000000',
        maxPrice: '999988293009945200000000000000'
      },
      balance: '0'
    },
    pnlToken: {
      name: 'USD Coin',
      symbol: 'USDC',
      decimals: 6,
      address: '0xaf88d065e77c8cC2239327C5EDb3A432268e5831',
      isStable: true,
      isV1Available: true,
      imageUrl: 'https://assets.coingecko.com/coins/images/6319/thumb/USD_Coin_icon.png?1547042389',
      coingeckoUrl: 'https://www.coingecko.com/en/coins/usd-coin',
      explorerUrl: 'https://arbiscan.io/address/0xaf88d065e77c8cC2239327C5EDb3A432268e5831',
      prices: {
        minPrice: '999888228864973000000000000000',
        maxPrice: '999988293009945200000000000000'
      },
      balance: '0'
    },
    markPrice: '96907228853725830000000000000000000',
    entryPrice: '90476980912344677640874724900000000',
    liquidationPrice: '173951714476587054884891651600000000',
    collateralUsd: '14054504936431454225948000000000',
    remainingCollateralUsd: '13984321823890436708309555726772',
    remainingCollateralAmount: '13985885',
    hasLowCollateral: false,
    leverage: '10056',
    leverageWithPnl: '10830',
    pnl: '-999453437528872511178841500000',
    pnlPercentage: '-711',
    pnlAfterFees: '-1076667968641492895440146352478',
    pnlAfterFeesPercentage: '-765',
    netValue: '12977836967789961330507853647522',
    closingFeeUsd: '7031418571602866622860579250',
    pendingFundingFeesUsd: '0',
    pendingClaimableFundingFeesUsd: '267843186050567369111000000000'
  },
  '0x8E1E8AA0deD409Aa6cA3E37E76239e3E3ff70BdF:0x7C11F78Ce78768518D743E81Fdfa2F860C6b9A77:0x2f2a2543B76A4166549F7aaB2e75Bef0aefC5B0f:false': {
    key:
      '0x8E1E8AA0deD409Aa6cA3E37E76239e3E3ff70BdF:0x7C11F78Ce78768518D743E81Fdfa2F860C6b9A77:0x2f2a2543B76A4166549F7aaB2e75Bef0aefC5B0f:false',
    contractKey: '0xb082a9fd492cdafecac1fa3a3741c83022944d62fcdcbd3c70700334a8bf5798',
    account: '0x8E1E8AA0deD409Aa6cA3E37E76239e3E3ff70BdF',
    marketAddress: '0x7C11F78Ce78768518D743E81Fdfa2F860C6b9A77',
    collateralTokenAddress: '0x2f2a2543B76A4166549F7aaB2e75Bef0aefC5B0f',
    sizeInUsd: '4228264775945677037417327280000000',
    sizeInTokens: '4579369',
    collateralAmount: '4576899',
    increasedAtBlock: '276274283',
    decreasedAtBlock: '0',
    isLong: false,
    pendingBorrowingFeesUsd: '14175507679510409942118901605675',
    fundingFeeAmount: '34382',
    claimableLongTokenAmount: '35320',
    claimableShortTokenAmount: '35320',
    marketInfo: {
      marketTokenAddress: '0x7C11F78Ce78768518D743E81Fdfa2F860C6b9A77',
      indexTokenAddress: '0x47904963fc8b2340414262125aF798B9655E58Cd',
      longTokenAddress: '0x2f2a2543B76A4166549F7aaB2e75Bef0aefC5B0f',
      shortTokenAddress: '0x2f2a2543B76A4166549F7aaB2e75Bef0aefC5B0f',
      isSameCollaterals: true,
      isSpotOnly: false,
      name: 'BTC/USD [BTC]',
      data: '',
      isDisabled: false,
      longToken: {
        name: 'Bitcoin (WBTC)',
        symbol: 'BTC',
        assetSymbol: 'WBTC',
        decimals: 8,
        address: '0x2f2a2543B76A4166549F7aaB2e75Bef0aefC5B0f',
        isShortable: true,
        imageUrl: 'https://assets.coingecko.com/coins/images/26115/thumb/btcb.png?1655921693',
        coingeckoUrl: 'https://www.coingecko.com/en/coins/wrapped-bitcoin',
        explorerUrl: 'https://arbiscan.io/address/0x2f2a2543b76a4166549f7aab2e75bef0aefc5b0f',
        isV1Available: true,
        prices: {
          minPrice: '96904484000000000000000000000000000',
          maxPrice: '96907228853725830000000000000000000'
        },
        balance: '0'
      },
      shortToken: {
        name: 'Bitcoin (WBTC)',
        symbol: 'BTC',
        assetSymbol: 'WBTC',
        decimals: 8,
        address: '0x2f2a2543B76A4166549F7aaB2e75Bef0aefC5B0f',
        isShortable: true,
        imageUrl: 'https://assets.coingecko.com/coins/images/26115/thumb/btcb.png?1655921693',
        coingeckoUrl: 'https://www.coingecko.com/en/coins/wrapped-bitcoin',
        explorerUrl: 'https://arbiscan.io/address/0x2f2a2543b76a4166549f7aab2e75bef0aefc5b0f',
        isV1Available: true,
        prices: {
          minPrice: '96904484000000000000000000000000000',
          maxPrice: '96907228853725830000000000000000000'
        },
        balance: '0'
      },
      indexToken: {
        name: 'Bitcoin',
        symbol: 'BTC',
        address: '0x47904963fc8b2340414262125aF798B9655E58Cd',
        isSynthetic: true,
        decimals: 8,
        imageUrl: 'https://assets.coingecko.com/coins/images/1/small/bitcoin.png?1547033579',
        explorerUrl: 'https://arbiscan.io/address/0x2f2a2543b76a4166549f7aab2e75bef0aefc5b0f',
        coingeckoUrl: 'https://www.coingecko.com/en/coins/bitcoin',
        prices: {
          minPrice: '96904484000000000000000000000000000',
          maxPrice: '96907228853725830000000000000000000'
        },
        balance: '0'
      },
      longInterestUsd: '3979574004976053563630344455294960000',
      shortInterestUsd: '13833328271721301313612162484869240000',
      longInterestInTokens: '4240860912',
      shortInterestInTokens: '17369869618',
      longPoolAmount: '69407097526',
      shortPoolAmount: '69407097526',
      maxLongPoolAmountForDeposit: '100000000000',
      maxShortPoolAmountForDeposit: '100000000000',
      maxLongPoolAmount: '100000000000',
      maxShortPoolAmount: '100000000000',
      longPoolAmountAdjustment: '0',
      shortPoolAmountAdjustment: '0',
      poolValueMin: '68681387355428400566469005455960919712',
      poolValueMax: '68683589723471349335627936055960919712',
      reserveFactorLong: '1050000000000000000000000000000',
      reserveFactorShort: '1050000000000000000000000000000',
      openInterestReserveFactorLong: '1000000000000000000000000000000',
      openInterestReserveFactorShort: '1000000000000000000000000000000',
      maxOpenInterestLong: '11885000000000000000000000000000000000',
      maxOpenInterestShort: '11885000000000000000000000000000000000',
      totalBorrowingFees: '18250196833874290966623604361999543',
      positionImpactPoolAmount: '23799792',
      minPositionImpactPoolAmount: '5000000',
      positionImpactPoolDistributionRate: '0',
      swapImpactPoolAmountLong: '0',
      swapImpactPoolAmountShort: '0',
      borrowingFactorLong: '6250000000000000000000',
      borrowingFactorShort: '6250000000000000000000',
      borrowingExponentFactorLong: '1000000000000000000000000000000',
      borrowingExponentFactorShort: '1000000000000000000000000000000',
      fundingFactor: '20000000000000000000000',
      fundingExponentFactor: '1000000000000000000000000000000',
      fundingIncreaseFactorPerSecond: '3523310220418287389',
      fundingDecreaseFactorPerSecond: '0',
      thresholdForDecreaseFunding: '0',
      thresholdForStableFunding: '40000000000000000000000000000',
      minFundingFactorPerSecond: '317097919837645865043',
      maxFundingFactorPerSecond: '25367833587011669203450',
      pnlLongMax: '65005189477620258184827772352520000',
      pnlLongMin: '65063392191995408243612572352520000',
      pnlShortMax: '-1499665514324803357750825157565380000',
      pnlShortMin: '-1499427125568140063193918757565380000',
      netPnlMax: '-1434660324847183099565997385212860000',
      netPnlMin: '-1434363733376144654950306185212860000',
      maxPnlFactorForTradersLong: '900000000000000000000000000000',
      maxPnlFactorForTradersShort: '900000000000000000000000000000',
      minCollateralFactor: '5000000000000000000000000000',
      minCollateralFactorForOpenInterestLong: '60000000000000000000',
      minCollateralFactorForOpenInterestShort: '60000000000000000000',
      claimableFundingAmountLong: '0',
      claimableFundingAmountShort: '0',
      positionFeeFactorForPositiveImpact: '500000000000000000000000000',
      positionFeeFactorForNegativeImpact: '700000000000000000000000000',
      positionImpactFactorPositive: '0',
      positionImpactFactorNegative: '0',
      maxPositionImpactFactorPositive: '5000000000000000000000000000',
      maxPositionImpactFactorNegative: '5000000000000000000000000000',
      maxPositionImpactFactorForLiquidations: '0',
      positionImpactExponentFactor: '2000000000000000000000000000000',
      swapFeeFactorForPositiveImpact: '0',
      swapFeeFactorForNegativeImpact: '0',
      swapImpactFactorPositive: '0',
      swapImpactFactorNegative: '0',
      swapImpactExponentFactor: '1000000000000000000000000000000',
      borrowingFactorPerSecondForLongs: '0',
      borrowingFactorPerSecondForShorts: '1285461114515063033913',
      fundingFactorPerSecond: '6508999775631869196545',
      longsPayShorts: true,
      virtualPoolAmountForLongToken: '0',
      virtualPoolAmountForShortToken: '0',
      virtualInventoryForPositions: '10611087298170777190969176663618314376',
      virtualMarketId: '0x0000000000000000000000000000000000000000000000000000000000000000',
      virtualLongTokenId: '0x0000000000000000000000000000000000000000000000000000000000000000',
      virtualShortTokenId: '0x0000000000000000000000000000000000000000000000000000000000000000'
    },
    indexToken: {
      name: 'Bitcoin',
      symbol: 'BTC',
      address: '0x47904963fc8b2340414262125aF798B9655E58Cd',
      isSynthetic: true,
      decimals: 8,
      imageUrl: 'https://assets.coingecko.com/coins/images/1/small/bitcoin.png?1547033579',
      explorerUrl: 'https://arbiscan.io/address/0x2f2a2543b76a4166549f7aab2e75bef0aefc5b0f',
      coingeckoUrl: 'https://www.coingecko.com/en/coins/bitcoin',
      prices: {
        minPrice: '96904484000000000000000000000000000',
        maxPrice: '96907228853725830000000000000000000'
      },
      balance: '0'
    },
    collateralToken: {
      name: 'Bitcoin (WBTC)',
      symbol: 'BTC',
      assetSymbol: 'WBTC',
      decimals: 8,
      address: '0x2f2a2543B76A4166549F7aaB2e75Bef0aefC5B0f',
      isShortable: true,
      imageUrl: 'https://assets.coingecko.com/coins/images/26115/thumb/btcb.png?1655921693',
      coingeckoUrl: 'https://www.coingecko.com/en/coins/wrapped-bitcoin',
      explorerUrl: 'https://arbiscan.io/address/0x2f2a2543b76a4166549f7aab2e75bef0aefc5b0f',
      isV1Available: true,
      prices: {
        minPrice: '96904484000000000000000000000000000',
        maxPrice: '96907228853725830000000000000000000'
      },
      balance: '0'
    },
    pnlToken: {
      name: 'Bitcoin (WBTC)',
      symbol: 'BTC',
      assetSymbol: 'WBTC',
      decimals: 8,
      address: '0x2f2a2543B76A4166549F7aaB2e75Bef0aefC5B0f',
      isShortable: true,
      imageUrl: 'https://assets.coingecko.com/coins/images/26115/thumb/btcb.png?1655921693',
      coingeckoUrl: 'https://www.coingecko.com/en/coins/wrapped-bitcoin',
      explorerUrl: 'https://arbiscan.io/address/0x2f2a2543b76a4166549f7aab2e75bef0aefc5b0f',
      isV1Available: true,
      prices: {
        minPrice: '96904484000000000000000000000000000',
        maxPrice: '96907228853725830000000000000000000'
      },
      balance: '0'
    },
    markPrice: '96907228853725830000000000000000000',
    entryPrice: '92332912590046293221125602200000000',
    liquidationPrice: '168286253415157743658377717121300000000',
    collateralUsd: '4435220359151160000000000000000000',
    remainingCollateralUsd: '4387727151782769590057881098394325',
    remainingCollateralAmount: '4527888',
    hasLowCollateral: false,
    leverage: '9636',
    leverageWithPnl: '10119',
    pnl: '-209474820940898966595372720000000',
    pnlPercentage: '-472',
    pnlAfterFees: '-259927813652451350463683750701675',
    pnlAfterFeesPercentage: '-585',
    netValue: '4175292545498708649536316249298325',
    closingFeeUsd: '2959785343161973926192129096000',
    pendingFundingFeesUsd: '33317699688880000000000000000000',
    pendingClaimableFundingFeesUsd: '68453327497600000000000000000000'
  }
}

function toSerializable(obj: any): any {
  if (BigNumber.isBigNumber(obj)) {
    return obj.toString()
  }
  if (Array.isArray(obj)) {
    return obj.map(toSerializable)
  }
  if (obj && typeof obj === 'object') {
    return Object.keys(obj).reduce((acc, key) => {
      acc[key] = toSerializable(obj[key])
      return acc
    }, {} as Record<string, any>)
  }
  return obj
}

console.warn = () => {}

async function main() {
  try {
    // const chainId = 42161
    // const account = '0x8E1E8AA0deD409Aa6cA3E37E76239e3E3ff70BdF'
    // const markets = await useMarketsInfo(chainId, account)

    // const positions = await usePositionsInfo(chainId, {
    //   account: account,
    //   marketsInfoData: markets.marketsInfoData,
    //   tokensData: markets.tokensData,
    //   showPnlInLeverage: false
    // })

    // const serializablePositions = toSerializable(positions.positionsInfoData)

    // console.log(JSON.stringify(serializablePositions, null, 2))

    ff.ff()

    const paymentDate = new Date()

    // Iterate over positionsInfoData
    Object.entries(gmxPositionsInfo).forEach(([key, position]) => {
      // Type assertion for position
      const pos = position as {
        marketInfo: {
          longToken: {
            decimals: number
            prices: { minPrice: string }
          }
        }
        claimableLongTokenAmount: string
        pendingClaimableFundingFeesUsd: string
      }

      const longToken = pos.marketInfo?.longToken
      const claimableLongTokenAmount = pos.claimableLongTokenAmount

      if (longToken && claimableLongTokenAmount && longToken.prices.minPrice) {
        // console.log(
        //   `Position Key: ${key}, Pending Claimable Funding Fees (Long USD): ${Number(
        //     pos.pendingClaimableFundingFeesUsd
        //   ) /
        //     10 ** 30}`
        // )
        const externalSymbol = pos.marketInfo.name + ' ' + pos.collateralToken.symbol
        const interest = Number(pos.pendingClaimableFundingFeesUsd) / 10 ** 30
        const symbol = 'BTC.USD-PERP:CRYP'
        const ffInterest = ff.ffInterest({
          externalSymbol,
          paymentDate,
          symbol,
          interest,
          description: key,
          currency: 'USDT',
          symbolCurrency: 'USDT',
          label: externalSymbol,
          assetType: 'CRYPTO'
        })
        console.log(ffInterest)
        console.log()
      } else {
        console.log(`Position Key: ${key} is missing required data for calculation.`)
      }
    })

    return
  } catch (error) {
    console.error('Error:', error)
    return
  }
}

main()
  .then(() => process.exit(0))
  .catch(() => process.exit(1))
