学习webpack的原理机制，让生活变得更加有趣

// 同步 方法 tap(注册) call(监听)
SyncHook
SyncBailHook
SyncWaterfallHook
SyncLoopHook

// 异步 分为两种: 串行 并行。 注册方法 tapAsync(cb) tapPromise  监听方法 callAsync promise
（异步并发）
AsyncParallelHook
AsyncParallelBailHook (异步熔断)

（异步串行）
AsyncSeriesHook
AsyncSeriesBailHook
AsyncSeriesWaterfallHook