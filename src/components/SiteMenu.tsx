type SiteMenyuProps = {
  onClickSiteTop?: () => void;
  onClickMyPage?: () => void;
  onClickContents?: () => void;
  onClickTerms?: () => void;
  onClickLogout?: () => void;
};

const SiteMenu: React.FC<SiteMenyuProps> = ({
  onClickSiteTop,
  onClickMyPage,
  onClickContents,
  onClickTerms,
  onClickLogout,
}) => {
  return (
    <>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "0.25rem",
          marginBottom: "1rem",
        }}
      >
        <button
          style={{ fontSize: "1.25rem", padding: "1rem" }}
          onClick={onClickSiteTop}
        >
          サイトトップ
        </button>
        <button
          style={{ fontSize: "1.25rem", padding: "1rem" }}
          onClick={onClickMyPage}
        >
          マイページ
        </button>
        <button
          style={{ fontSize: "1.25rem", padding: "1rem" }}
          onClick={onClickContents}
        >
          コンテンツ一覧
        </button>
        <button
          style={{ fontSize: "1.25rem", padding: "1rem" }}
          onClick={onClickTerms}
        >
          利用規約
        </button>
        <button
          style={{ fontSize: "1.25rem", padding: "1rem", gridColumn: "span 2" }}
          onClick={onClickLogout}
        >
          ログアウト
        </button>
      </div>
    </>
  );
};

export default SiteMenu;
