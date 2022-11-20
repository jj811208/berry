defaultText 是幹嘛用的？
concatenateValues 還有存在的必要嗎（在有 onConflict 的現在）
overwrite 選項拔掉（之後依賴 onConflict）

https://github.com/yarnpkg/berry/pull/4982

目標
- Rework the RESOLVED_RC_FILE marker so that it isn't needed
- Make Configuration#use accept onConflict markers

// this.value => data
// data => resolvedConfig


讓 use 能傳陣列（我覺得 source 有點奇怪）