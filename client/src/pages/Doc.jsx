import React from 'react';
import { Anchor, Col, Row } from 'antd';

import SyntaxSpecification from './Doc/SyntaxSpecification';

import './Doc.css';
const { Link } = Anchor;

const Doc = () => {
  return (
    <div className="doc-wrap">
      <Row>
        <Col span={18}>
          <SyntaxSpecification></SyntaxSpecification>
        </Col>
        <Col span={6}>
          <Anchor>
            <Link href="#Syntax-Specification" title="语法规范">
              <Link href="#DTD" title="数据模板定义规范" />
              <Link href="#DPD" title="数据占位符定义规范" />
            </Link>
          </Anchor>
        </Col>
      </Row>
    </div>
  );
};

export default Doc;
