import React, { useState } from "react";
import { Icon, List, Page, Tabs, useNavigate } from "zmp-ui";

export default function Nation() {
  const [active, setActive] = useState(0);
  const languages = [
    {
      label: "Việt Nam",
      id: "0",
    },
    {
      label: "Campuchia",
      id: "1",
    },
    {
      label: "England",
      id: "2",
    },
    {
      label: "Trung Quốc",
      id: "3",
    },
    {
      label: "Thái Lan",
      id: "4",
    },
    {
      label: "Mỹ",
      id: "5",
    },
    {
      label: "Tây Ban Nha",
      id: "6",
    },
    {
      label: "Singapore",
      id: "7",
    },
    {
      label: "Brunei",
      id: "8",
    },
    {
      label: "España",
      id: "9",
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
