
# Nuxt 3 Sample Project

此專案包含位於 `app/` 目錄的基本 Nuxt 3 架構，已配置 TypeScript、Tailwind CSS 與 Prisma。

## 使用方式

```bash
cd app
cp .env.example .env  # 建立環境設定檔
npm install        # 如環境允許，安裝相依套件
npm run dev        # 啟動開發伺服器
```

複製 `.env.example` 為 `.env` 後可調整資料庫連線字串，預設使用 SQLite。

Prisma schema 位於 `app/prisma/schema.prisma`，`server/routes/` 目前為空目錄，可自行新增 API 路由。

# Nuxt 3 NFC 好評系統

本專案示範如何使用 **Nuxt 3** 建立一個結合 NFC 的好評收集系統。透過將商品或服務搭配 NFC 標籤，使用者可以快速掃描並留下好評或進行付款。專案採用 PostgreSQL 儲存資料，並整合 Stripe 進行金流處理。

## 目錄架構

以下為建議的 Nuxt 3 專案結構：

```
/ (專案根目錄)
├─ app/               # Nuxt 應用入口
├─ components/        # 共用元件
├─ composables/       # 可重複使用的組合函式
├─ pages/             # 路由頁面
├─ server/            # API 與伺服器端邏輯
│  ├─ api/            # API 路由
│  └─ middleware/     # 伺服器端中介軟體
├─ public/            # 靜態檔案
└─ nuxt.config.ts     # Nuxt 設定檔
```

## 環境需求

- **Node.js 18** 以上版本
- **PostgreSQL** 資料庫
- **Stripe** 帳號與 API 金鑰
- 建議安裝 `pnpm` 以加快套件安裝速度（亦可使用 `npm`）

## 安裝步驟

1. 下載或複製此專案到本機：
   ```bash
   git clone <repo-url>
   cd nfc
   ```
2. 安裝相依套件：
   ```bash
   pnpm install       # 或使用 npm install
   ```
3. 設定環境變數 `.env`：
   ```env
   DATABASE_URL=postgres://user:password@localhost:5432/db_name
   STRIPE_SECRET_KEY=your_stripe_secret
   JWT_SECRET=your_jwt_secret
   ```
4. 建立資料庫與執行遷移（若有使用 ORM，如 Prisma）：
   ```bash
   pnpm prisma migrate deploy
   ```
5. 啟動開發伺服器：
   ```bash
   pnpm dev
   ```

## 部署方式

### 本機部署
1. 確認 PostgreSQL 已啟動並可連線。
2. 於專案根目錄執行 `pnpm build`，再以 `pnpm start` 啟動。

### 部署到 Vercel
1. 在 Vercel 建立新專案並連結此儲存庫。
2. 設定 Vercel 的環境變數（如 `DATABASE_URL`、`STRIPE_KEY`）。
3. Vercel 會自動執行 `pnpm install` 與 `pnpm build`，完成後即可透過 Vercel 伺服器存取。

## 基本使用流程

1. 使用管理介面新增商品或服務，並為其配置 NFC 標籤。
2. 使用者以行動裝置掃描 NFC 後，進入對應的 Nuxt 網頁。
3. 在頁面上留下好評或透過 Stripe 完成付款流程。
4. 後台可查看累積的好評與交易紀錄。
5. 會員登入後可於 Dashboard 檢視訂閱狀態並隨時取消。

## 開發者注意事項

- 請務必使用 **Node 18** 以上版本以相容 Nuxt 3。
- 在推送程式碼前建議執行 `pnpm lint` 與 `pnpm test`（若專案提供測試腳本）。
- 若使用 Prisma 或其他 ORM，修改資料表後記得執行遷移指令並同步到資料庫。
- Stripe 金鑰與資料庫連線資訊請勿直接寫入程式碼庫，應放入 `.env` 檔並設定忽略規則。

歡迎依需求擴充或調整此專案，若有任何問題歡迎提出 Issue 或 Pull Request。


