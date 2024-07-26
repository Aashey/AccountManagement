import React from "react";
import CustomSider from "../sider";
import { Card, Layout } from "antd";
import { Outlet } from "react-router-dom";

const CustomLayout = () => {
  const { Content } = Layout;
  return (
    <>
      <Layout
        theme="light"
        style={{
          minHeight: "100vh",
        }}
      >
        <CustomSider />
        <Content
          style={{
            margin: "0 16px",
          }}
        >
          <Card className="m-auto mt-20 p-2 w-[90%] h-[80vh]">
            <Outlet />
          </Card>
        </Content>
      </Layout>
    </>
  );
};

export default CustomLayout;