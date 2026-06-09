import React, { useState } from "react";
import "./App.css";

export default function Form() {
  let [formData, setFormData] = useState({
    product_id: 123,
    product_name: "",
    sku: "",
    price: 0,
    quantity: 0,
    description: "",
    category: "",
    condition: "",
    features: [],
    import_date: "",
    import_time: "",
    launch_datetime: "",
    supplier_email: "",
    supplier_phone: "",
  });

  // Xử lý thay đổi giá trị input
  let handleInputChange = (event) => {
    // Lấy các thuộc tính từ input: name (tên field), value (giá trị), type (loại input), checked (trạng thái checkbox)
    let { name, value, type, checked } = event.target;

    // Xử lý riêng cho checkbox
    if (type === "checkbox") {
      // Nếu checkbox được tích: thêm giá trị vào mảng features
      // Nếu checkbox bị bỏ tích: xóa giá trị khỏi mảng features
      let updatedFeatures;
      if (checked) {
        // Checkbox được tích → thêm giá trị vào mảng
        updatedFeatures = [...formData.features, value];
      } else {
        // Checkbox bị bỏ tích → xóa giá trị khỏi mảng
        updatedFeatures = formData.features.filter((f) => f !== value);
      }
      
      // Cập nhật state với mảng features mới
      setFormData((prev) => ({ ...prev, features: updatedFeatures }));
    } else {
      // Xử lý cho input bình thường (text, number, select, radio, v.v.)
      // Copy toàn bộ state cũ (...prev) rồi thay đổi field tương ứng
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Xử lý submit form
  let handleSubmit = (event) => {
    // Ngăn hành vi mặc định của form (reload trang)
    event.preventDefault();
    // In dữ liệu form ra console để kiểm tra
    console.log("Form Data:", formData);
    // Hiển thị popup với dữ liệu form dưới dạng JSON
    // JSON.stringify(..., null, 2) = chuyển object thành chuỗi JSON + thụt lề (2 spaces)
    alert("Dữ liệu form: " + JSON.stringify(formData, null, 2));
  };

  return (
    <div>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        {/* Hidden */}
        <input
          type="hidden"
          name="product_id"
          value={formData.product_id}
          onChange={handleInputChange}
        />
        {/* Text */}
        <div className="form-group">
          <label>Tên sản phẩm</label>
          <input
            type="text"
            name="product_name"
            value={formData.product_name}
            onChange={handleInputChange}
            required
          />
        </div>
        {/* SKU */}
        <div className="form-group">
          <label>Mã sản phẩm (SKU)</label>
          <input
            type="text"
            name="sku"
            value={formData.sku}
            onChange={handleInputChange}
          />
        </div>
        {/* Number */}
        <div className="form-group">
          <label>Giá bán</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            min={0}
            step={1000}
          />
        </div>
        {/* Quantity */}
        <div className="form-group">
          <label>Số lượng tồn</label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleInputChange}
            min={0}
          />
        </div>
        {/* Textarea */}
        <div className="form-group">
          <label>Mô tả sản phẩm</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows={5}
          />
        </div>
        {/* Select */}
        <div className="form-group">
          <label>Danh mục</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleInputChange}
          >
            <option value="">-- Chọn danh mục --</option>
            <option value="dien-thoai">Điện thoại</option>
            <option value="laptop">Laptop</option>
            <option value="phu-kien">Phụ kiện</option>
            <option value="gia-dung">Gia dụng</option>
          </select>
        </div>

        {/* Radio */}
        <div className="form-group">
          <label>Tình trạng</label>
          <div className="inline">
            <label>
              <input
                type="radio"
                name="condition"
                value="new"
                checked={formData.condition === "new"}
                onChange={handleInputChange}
              />
              Mới
            </label>
            <label>
              <input
                type="radio"
                name="condition"
                value="used"
                checked={formData.condition === "used"}
                onChange={handleInputChange}
              />
              Đã sử dụng
            </label>
          </div>
        </div>
        {/* Checkbox */}
        <div className="form-group">
          <label>Tính năng</label>
          <div className="inline">
            <label>
              <input
                type="checkbox"
                name="features"
                value="hot"
                checked={formData.features.includes("hot")}
                onChange={handleInputChange}
              />
              Hot
            </label>
            <label>
              <input
                type="checkbox"
                name="features"
                value="sale"
                checked={formData.features.includes("sale")}
                onChange={handleInputChange}
              />
              Sale
            </label>
            <label>
              <input
                type="checkbox"
                name="features"
                value="featured"
                checked={formData.features.includes("featured")}
                onChange={handleInputChange}
              />
              Nổi bật
            </label>
          </div>
        </div>
        {/* Date */}
        <div className="form-group">
          <label>Ngày nhập kho</label>
          <input
            type="date"
            name="import_date"
            value={formData.import_date}
            onChange={handleInputChange}
          />
        </div>
        {/* Time */}
        <div className="form-group">
          <label>Giờ nhập</label>
          <input
            type="time"
            name="import_time"
            value={formData.import_time}
            onChange={handleInputChange}
          />
        </div>
        {/* Datetime */}
        <div className="form-group">
          <label>Ngày giờ mở bán</label>
          <input
            type="datetime-local"
            name="launch_datetime"
            value={formData.launch_datetime}
            onChange={handleInputChange}
          />
        </div>

        {/* Email */}
        <div className="form-group">
          <label>Email nhà cung cấp</label>
          <input
            type="email"
            name="supplier_email"
            value={formData.supplier_email}
            onChange={handleInputChange}
          />
        </div>
        {/* Tel */}
        <div className="form-group">
          <label>Số điện thoại nhà cung cấp</label>
          <input
            type="tel"
            name="supplier_phone"
            value={formData.supplier_phone}
            onChange={handleInputChange}
          />
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
