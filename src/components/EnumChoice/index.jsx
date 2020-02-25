/**
 * @desc 组件 - EnumChoice
 * @author rgy
 * @date 2019-08-13 22:41:53
 */

import React from "react";
import EnumCheckbox from "./EnumCheckbox/index.jsx";
import EnumRadio from "./EnumRadio/index.jsx";

class EnumChoice extends React.Component {}

EnumChoice.Checkbox = EnumCheckbox;
EnumChoice.Radio = EnumRadio;

export default EnumChoice;