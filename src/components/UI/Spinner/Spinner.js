import React from "react";
import { Spin, Icon } from "antd";

const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

const spin = props => <Spin size={props.large} indicator={antIcon} />;

export default spin;
