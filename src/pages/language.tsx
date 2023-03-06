import React, { useState } from "react";
import { Icon, List, Page, Tabs, useNavigate } from "zmp-ui";

export default function Language() {
  const [active, setActive] = useState(0);
  const languages = [
    {
      label: "Tiếng Việt",
      id: "0",
    },
    {
      label: "English",
      id: "1",
    },
    {
      label: "中文 (简体）",
      id: "2",
    },
    {
      label: "中國 (傳統）",
      id: "3",
    },
    {
      label: "한국",
      id: "4",
    },
    {
      label: "ประเทศไทย",
      id: "5",
    },
    {
      label: "España",
      id: "6",
    },
  ];
  const checkActive = (e) => {
    setActive(e.currentTarget.id);
  };

  return (
    <Page>
      <List>
        {languages.map((langua, i) => (
          <List.Item
            id={langua.id}
            title={langua.label}
            key={i}
            onClick={checkActive}
            suffix={active == +langua.id ? <Icon icon="zi-check" /> : ""}
          />
        ))}
      </List>
    </Page>
  );
}
