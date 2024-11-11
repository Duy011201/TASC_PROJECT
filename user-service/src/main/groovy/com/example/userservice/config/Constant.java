package com.example.userservice.config;

public interface Constant {
    public static final String REX_NUMBER = "^[0-9]*$";
    public static final String REX_EMAIL = "^[\\w-\\.]+@[\\w-\\.]+\\.[a-zA-Z]{2,7}$";

    public static final String LOGIN_SUCCESS = "Đăng nhập thành công";
    public static final String SING_UP_SUCCESS = "Đăng ký thành công";
    public static final String ADD_SUCCESS = "Thêm thành công";
    public static final String UPDATE_SUCCESS = "Sửa thành công";
    public static final String DELETE_SUCCESS = "Xóa thành công";
    public static final String GET_SUCCESS = "Lấy dữ liệu thành công";
    public static final String GET_FAIL = "Lấy dữ liệu thất bại";

    public static final String ACCOUNT_EXIT = "Tài khoản đã tồn tại";
    public static final String COMPANY_EXIT = "Công ty đã tồn tại";
    public static final String EMAIL_EXIT = "Email đã tồn tại";
    public static final String CORPORATE_TAX_CODE_EXIT = "Mã số thuế đã tồn tại";

    public static final String ACCOUNT_NOT_EXIT = "Tài khoản không tồn tại";
    public static final String COMPANY_NOT_EXIT = "Công ty không tồn tại";

    public static final String COMPANY_REQUIRE = "Công ty bắt buộc";

    public static final String LOGIN_FAIL = "Đăng nhập thất bại";
    public static final String SIGN_UP_FAIL = "Đăng ký thất bại";
    public static final String ADD_FAIL = "Thêm thất bại";
    public static final String UPDATE_FAIL = "Sửa thất bại";
    public static final String DELETE_FAIL = "Xóa thất bại";
}
