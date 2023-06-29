import { Breadcrumb, Layout, theme } from 'antd';

import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import Home from './pages/Home';
import Doc from './pages/Doc';

import TopMenu from './components/TopMenu';

import 'antd/dist/reset.css';
import './App.css';

const { Header, Content, Footer } = Layout;

function App() {
  const {
    token: { colorBgContainer },
  } = theme.useToken();



  return (
    <Router>
      <Layout className="layout">
        <Header>
          <div className="logo" />
          <TopMenu/>
        </Header>
        <Content style={{ padding: '0 50px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}></Breadcrumb>
          <div
            className="site-layout-content"
            style={{ background: colorBgContainer }}
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/doc" element={<Doc />} />
            </Routes>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>©2022 ZWJ</Footer>
      </Layout>
    </Router>
  );
}

export default App;
