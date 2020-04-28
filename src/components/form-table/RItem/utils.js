/**
 * 获取表单校验状态
 * @param {*} field
 * @param {*} form
 * @return {Object}
 */
const getValidateStatus = (field, form) => {
  const { isFieldValidating, getFieldError, getFieldValue } = form;
  if (!field) {
    return {};
  }
  if (isFieldValidating(field)) {
    return {
      status: "validating",
    };
  } else if (!!getFieldError(field)) {
    return {
      status: "error",
      message: getFieldError(field),
    };
  } else if (getFieldValue(field) !== undefined) {
    return {
      status: "success",
    };
  }
  return {};
};

export { getValidateStatus };
