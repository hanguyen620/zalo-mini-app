import React from "react";
import { List, Page, Icon } from "zmp-ui";
import { useNavigate } from "react-router-dom";

export default function Infor() {
  const navigate = useNavigate();
  const listInfos = [
    {
      title: "Ngôn ngữ",
      label: "Tiếng Việt",
    },
    {
      title: "Quốc gia bạn sống",
      label: "Vietnam",
    },
    {
      title: "Thịnh hành tại",
      label: "Vietnam",
    },
    {
      title: "Đổi màu trình chơi nhạc",
      label: "Black",
    },
    {
      title: "App đã được cập nhật 1.21",
      label: "Kiểm tra tại www.amazingmusicpro.com",
    },
    {
      title: "Follow chúng tôi",
      label: "Báo lỗi, cảm ơn, tính năng,...",
    },
  ];

  return (
    <div className="change-info">
      <h1 className="text-2xl font-bold">Thông tin</h1>
      <Page>
        <List>
          <List.Item
            children={
              <>
                <div style={{ fontSize: 16 }}>Ngôn ngữ</div>
                <div style={{ fontSize: 14, opacity: 0.8 }}>Tiếng Việt</div>
              </>
            }
            className="custom-zaui-list-item"
            onClick={() => {
              navigate("/infor/language");
            }}
          />
          <List.Item
            children={
              <>
                <div style={{ fontSize: 16 }}>Quốc gia bạn sống</div>
                <div style={{ fontSize: 14, opacity: 0.8 }}>Vietnam</div>
              </>
            }
            className="custom-zaui-list-item"
            onClick={() => {
              navigate("/infor/nation");
            }}
          />
          <List.Item
            children={
              <>
                <div style={{ fontSize: 16 }}>Thịnh hành tại</div>
                <div style={{ fontSize: 14, opacity: 0.8 }}>Vietnam</div>
              </>
            }
            className="custom-zaui-list-item"
            onClick={() => {
              navigate("/infor/popular");
            }}
          />
          <List.Item
            children={
              <>
                <div style={{ fontSize: 16 }}>Đổi màu trình chơi nhạc</div>
                <div style={{ fontSize: 14, opacity: 0.8 }}>Black</div>
              </>
            }
            className="custom-zaui-list-item"
            onClick={() => {
              navigate("/infor/language");
            }}
          />
          <List.Item
            children={
              <>
                <div style={{ fontSize: 16 }}>App đã được cập nhật</div>
                <div style={{ fontSize: 14, opacity: 0.8 }}>
                  Kiểm tra tại www.amazingmusicpro.com
                </div>
              </>
            }
            className="custom-zaui-list-item"
            onClick={() => {
              window.open("https://www.amazingmusicpro.com/");
            }}
          />
          <List.Item
            children={
              <>
                <div style={{ fontSize: 16 }}>Follow chúng tôi</div>
                <div style={{ fontSize: 14, opacity: 0.8 }}>
                  Báo lỗi, cảm ơn, tính năng,...
                </div>
              </>
            }
            className="custom-zaui-list-item"
            onClick={() => {
              window.open("https://www.amazingmusicpro.com/");
            }}
          />
        </List>
      </Page>
      <div className="flex items-center justify-center mt-6">
        <button className="bg-green-600 py-3 px-6 rounded-3xl">
          Mua Premium chỉ 89,000đ
        </button>
      </div>
    </div>
  );
}
