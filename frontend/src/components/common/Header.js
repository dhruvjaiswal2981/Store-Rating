import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Dropdown, Menu, Avatar } from 'antd';
import {
  UserOutlined,
  LogoutOutlined,
  DashboardOutlined,
} from '@ant-design/icons';


const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getDashboardLink = () => {
    if (!user) return '/';
    switch (user.role) {
      case 'admin': return '/admin/dashboard';
      case 'storeOwner': return '/store/dashboard';
      case 'user': return '/user/stores';
      default: return '/';
    }
  };

  const menu = (
    <Menu>
      <Menu.Item key="dashboard" icon={<DashboardOutlined />}>
        <Link to={getDashboardLink()}>Dashboard</Link>
      </Menu.Item>
      <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={handleLogout}>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <header className="app-header">
      <div className="header-left">
        <Link to="/" className="logo">
          Store Rating App
        </Link>
      </div>
      <div className="header-right">
        {user ? (
          <Dropdown overlay={menu} placement="bottomRight">
            <div className="user-dropdown">
              <Avatar
                icon={<UserOutlined />}
                className="user-avatar"
              />
              <span className="user-name">{user.name}</span>
            </div>
          </Dropdown>
        ) : (
          <Button type="primary" onClick={() => navigate('/login')}>
            Login
          </Button>
        )}
      </div>
    </header>
  );
};

export default Header;