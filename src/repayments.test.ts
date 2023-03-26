import {
  RepaymentFrequency,
  calculateRepaymentAmount,
  RepaymentSchedule,
  buildRepaymentSchedule,
} from './repayments';

describe('calculateRepaymentAmount()', () => {
  test.each([
    [30_000, 7, 15.99, RepaymentFrequency.MONTHLY, 595.69],
    [30_000, 7, 15.99, RepaymentFrequency.FORTNIGHTLY, 274.40],
    [30_000, 7, 15.99, RepaymentFrequency.WEEKLY, 137.09],
    [1_000_000, 30, 4.05, RepaymentFrequency.MONTHLY, 4_803.02],
    [1_000_000, 30, 4.05, RepaymentFrequency.FORTNIGHTLY, 2_215.75],
    [1_000_000, 30, 4.05, RepaymentFrequency.WEEKLY, 1_107.65],
  ])('principal = $%p, term = %p years, rate = %p%%, frequency = %p', (
    loanPrincipal,
    loanTerm,
    interestRate,
    repaymentFrequency,
    expected
  ) => {
    const actual = calculateRepaymentAmount({
      loanPrincipal,
      loanTerm,
      interestRate,
      repaymentFrequency,
    });
    expect(actual).toBeCloseTo(expected, 2);
  });
});

describe('buildRepaymentSchedule()', () => {
  it('handles test scenario', () => {
    const expected: RepaymentSchedule = [
      {
          "period": 0,
          "repaymentAmount": 0,
          "interestThisPayment": 0,
          "principalThisPayment": 0,
          "interestToDate": 0,
          "unpaidPrincipalBalance": 5000,
          "costToDate": 0
      },
      {
          "period": 1,
          "repaymentAmount": 230.72463168758333,
          "interestThisPayment": 41.666666666666664,
          "principalThisPayment": 189.05796502091667,
          "interestToDate": 41.666666666666664,
          "unpaidPrincipalBalance": 4810.9420349790835,
          "costToDate": 230.72463168758333
      },
      {
          "period": 2,
          "repaymentAmount": 230.72463168758333,
          "interestThisPayment": 40.091183624825696,
          "principalThisPayment": 190.63344806275762,
          "interestToDate": 81.75785029149236,
          "unpaidPrincipalBalance": 4620.308586916326,
          "costToDate": 461.44926337516665
      },
      {
          "period": 3,
          "repaymentAmount": 230.72463168758333,
          "interestThisPayment": 38.50257155763605,
          "principalThisPayment": 192.22206012994727,
          "interestToDate": 120.26042184912842,
          "unpaidPrincipalBalance": 4428.086526786379,
          "costToDate": 692.17389506275
      },
      {
          "period": 4,
          "repaymentAmount": 230.72463168758333,
          "interestThisPayment": 36.90072105655316,
          "principalThisPayment": 193.82391063103017,
          "interestToDate": 157.16114290568157,
          "unpaidPrincipalBalance": 4234.262616155349,
          "costToDate": 922.8985267503333
      },
      {
          "period": 5,
          "repaymentAmount": 230.72463168758333,
          "interestThisPayment": 35.28552180129457,
          "principalThisPayment": 195.43910988628875,
          "interestToDate": 192.44666470697615,
          "unpaidPrincipalBalance": 4038.82350626906,
          "costToDate": 1153.6231584379166
      },
      {
          "period": 6,
          "repaymentAmount": 230.72463168758333,
          "interestThisPayment": 33.65686255224217,
          "principalThisPayment": 197.06776913534117,
          "interestToDate": 226.1035272592183,
          "unpaidPrincipalBalance": 3841.755737133719,
          "costToDate": 1384.3477901254998
      },
      {
          "period": 7,
          "repaymentAmount": 230.72463168758333,
          "interestThisPayment": 32.01463114278099,
          "principalThisPayment": 198.71000054480234,
          "interestToDate": 258.1181584019993,
          "unpaidPrincipalBalance": 3643.0457365889165,
          "costToDate": 1615.072421813083
      },
      {
          "period": 8,
          "repaymentAmount": 230.72463168758333,
          "interestThisPayment": 30.358714471574302,
          "principalThisPayment": 200.36591721600902,
          "interestToDate": 288.4768728735736,
          "unpaidPrincipalBalance": 3442.6798193729073,
          "costToDate": 1845.7970535006664
      },
      {
          "period": 9,
          "repaymentAmount": 230.72463168758333,
          "interestThisPayment": 28.68899849477423,
          "principalThisPayment": 202.0356331928091,
          "interestToDate": 317.16587136834784,
          "unpaidPrincipalBalance": 3240.644186180098,
          "costToDate": 2076.5216851882496
      },
      {
          "period": 10,
          "repaymentAmount": 230.72463168758333,
          "interestThisPayment": 27.005368218167483,
          "principalThisPayment": 203.71926346941584,
          "interestToDate": 344.1712395865153,
          "unpaidPrincipalBalance": 3036.9249227106825,
          "costToDate": 2307.246316875833
      },
      {
          "period": 11,
          "repaymentAmount": 230.72463168758333,
          "interestThisPayment": 25.307707689255686,
          "principalThisPayment": 205.41692399832763,
          "interestToDate": 369.47894727577096,
          "unpaidPrincipalBalance": 2831.507998712355,
          "costToDate": 2537.9709485634166
      },
      {
          "period": 12,
          "repaymentAmount": 230.72463168758333,
          "interestThisPayment": 23.595899989269626,
          "principalThisPayment": 207.1287316983137,
          "interestToDate": 393.0748472650406,
          "unpaidPrincipalBalance": 2624.379267014041,
          "costToDate": 2768.695580251
      },
      {
          "period": 13,
          "repaymentAmount": 230.72463168758333,
          "interestThisPayment": 21.869827225117007,
          "principalThisPayment": 208.85480446246632,
          "interestToDate": 414.9446744901576,
          "unpaidPrincipalBalance": 2415.5244625515747,
          "costToDate": 2999.4202119385836
      },
      {
          "period": 14,
          "repaymentAmount": 230.72463168758333,
          "interestThisPayment": 20.129370521263123,
          "principalThisPayment": 210.5952611663202,
          "interestToDate": 435.0740450114207,
          "unpaidPrincipalBalance": 2204.9292013852546,
          "costToDate": 3230.144843626167
      },
      {
          "period": 15,
          "repaymentAmount": 230.72463168758333,
          "interestThisPayment": 18.374410011543787,
          "principalThisPayment": 212.35022167603955,
          "interestToDate": 453.4484550229645,
          "unpaidPrincipalBalance": 1992.578979709215,
          "costToDate": 3460.8694753137506
      },
      {
          "period": 16,
          "repaymentAmount": 230.72463168758333,
          "interestThisPayment": 16.604824830910125,
          "principalThisPayment": 214.1198068566732,
          "interestToDate": 470.0532798538746,
          "unpaidPrincipalBalance": 1778.4591728525418,
          "costToDate": 3691.594107001334
      },
      {
          "period": 17,
          "repaymentAmount": 230.72463168758333,
          "interestThisPayment": 14.820493107104515,
          "principalThisPayment": 215.90413858047881,
          "interestToDate": 484.8737729609791,
          "unpaidPrincipalBalance": 1562.555034272063,
          "costToDate": 3922.3187386889176
      },
      {
          "period": 18,
          "repaymentAmount": 230.72463168758333,
          "interestThisPayment": 13.021291952267191,
          "principalThisPayment": 217.70333973531615,
          "interestToDate": 497.8950649132463,
          "unpaidPrincipalBalance": 1344.851694536747,
          "costToDate": 4153.043370376501
      },
      {
          "period": 19,
          "repaymentAmount": 230.72463168758333,
          "interestThisPayment": 11.20709745447289,
          "principalThisPayment": 219.51753423311044,
          "interestToDate": 509.1021623677192,
          "unpaidPrincipalBalance": 1125.3341603036365,
          "costToDate": 4383.768002064085
      },
      {
          "period": 20,
          "repaymentAmount": 230.72463168758333,
          "interestThisPayment": 9.37778466919697,
          "principalThisPayment": 221.34684701838637,
          "interestToDate": 518.4799470369162,
          "unpaidPrincipalBalance": 903.9873132852501,
          "costToDate": 4614.492633751668
      },
      {
          "period": 21,
          "repaymentAmount": 230.72463168758333,
          "interestThisPayment": 7.5332276107104175,
          "principalThisPayment": 223.1914040768729,
          "interestToDate": 526.0131746476267,
          "unpaidPrincipalBalance": 680.7959092083772,
          "costToDate": 4845.217265439252
      },
      {
          "period": 22,
          "repaymentAmount": 230.72463168758333,
          "interestThisPayment": 5.673299243403143,
          "principalThisPayment": 225.0513324441802,
          "interestToDate": 531.6864738910298,
          "unpaidPrincipalBalance": 455.74457676419706,
          "costToDate": 5075.941897126835
      },
      {
          "period": 23,
          "repaymentAmount": 230.72463168758333,
          "interestThisPayment": 3.7978714730349754,
          "principalThisPayment": 226.92676021454835,
          "interestToDate": 535.4843453640648,
          "unpaidPrincipalBalance": 228.8178165496487,
          "costToDate": 5306.666528814419
      },
      {
          "period": 24,
          "repaymentAmount": 230.72463168758333,
          "interestThisPayment": 1.9068151379137392,
          "principalThisPayment": 228.81781654966957,
          "interestToDate": 537.3911605019786,
          "unpaidPrincipalBalance": 0,
          "costToDate": 5537.391160502002
      }
    ];
    const actual = buildRepaymentSchedule({
      loanAmount: 5_000,
      repaymentAmount: 230.72463168758333,
      interestRatePeriodRatio: 0.008333333333333333,
      numberOfRepayments: 24,
    });
    expect(actual).toEqual(expected);
  });
});
