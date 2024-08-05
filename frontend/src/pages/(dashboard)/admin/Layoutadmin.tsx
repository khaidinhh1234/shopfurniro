import { Logo } from "@/components/Icons";
import {
  AppstoreOutlined,
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  ShopOutlined,
  TeamOutlined,
  UserSwitchOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Breadcrumb, Button, Layout, Menu, theme } from "antd";
import { useState } from "react";
import { Link, Outlet } from "react-router-dom";

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}
const items: MenuItem[] = [
  getItem(
    "Dashboard",
    "1",
    <Link to={"/admin"}>
      {" "}
      <PieChartOutlined />
    </Link>
  ),
  getItem(
    "Products",
    "2",
    <Link to={"/admin/products"}>
      <ShopOutlined />
    </Link>
  ),
  getItem(
    "Categories",
    "3",
    <Link to={"/admin/category"}>
      {" "}
      <AppstoreOutlined />
    </Link>
  ),
  getItem(
    "Order",
    "4",
    <Link to={"/admin/orders"}>
      {" "}
      <FileOutlined />
    </Link>
  ),
  getItem(
    "Ship",
    "5",
    <Link to={"/admin/ship"}>
      <UserSwitchOutlined />
    </Link>
  ),
  getItem(
    "User",
    "6",
    <Link to={"/admin/users"}>
      <UserSwitchOutlined />
    </Link>
  ),
];

const LayoutAdmin = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <div>
      {" "}
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          className=""
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
        >
          <div className="w-full h-16   bg-white">
            <img src={Logo} alt="" className="mx-auto pt-2" />
          </div>
          <div className="demo-logo-vertical pt-5" />
          <Menu
            theme="dark"
            defaultSelectedKeys={["1"]}
            mode="inline"
            items={items}
          />
        </Sider>
        <Layout>
          <Header style={{ padding: 0, background: colorBgContainer }}>
            <div className="flex justify-end mx-20">
              <div className="h-1">
                <Link to={"/"}>
                  <Button className="bg-black  text-white py-3 px-3">
                    Thoát
                  </Button>
                </Link>
              </div>
            </div>
          </Header>
          <Content style={{ margin: "0 16px" }}>
            <Outlet />
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Ant Design ©{new Date().getFullYear()} Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    </div>
  );
};

export default LayoutAdmin;
