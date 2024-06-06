import React from 'react';
import "../styles/homeUses.css"

const vaccineItems = [
  {
    imgSrc: "https://vnvc.vn/wp-content/uploads/2022/05/vac-xin-gardasil-9.jpg",
    imgAlt: "Vắc xin Gardasil 9",
    title: "Vắc xin Gardasil 9 (Mỹ)"
  },
  {
    imgSrc: "https://vnvc.vn/wp-content/uploads/2017/04/vac-xin-gardasil.jpg",
    imgAlt: "Vắc xin Gardasil",
    title: "Vắc xin Gardasil (Mỹ)"
  },
  {
    imgSrc: "https://vnvc.vn/wp-content/uploads/2024/02/vac-xin-bexsero-1.jpg",
    imgAlt: "Vắc xin Bexsero",
    title: "Vắc xin Bexsero (Bỉ)"
  },
  {
    imgSrc: "https://vnvc.vn/wp-content/uploads/2020/02/vac-xin-Menactra.jpg",
    imgAlt: "Vắc xin Menactra",
    title: "Vắc xin Menactra (Mỹ)"
  },
  {
    imgSrc: "https://vnvc.vn/wp-content/uploads/2017/04/vac-xin-va-mengoc-bc.jpg",
    imgAlt: "Vắc xin Mengoc BC",
    title: "Vắc xin Mengoc BC (Cuba)"
  },
  {
    imgSrc: "https://vnvc.vn/wp-content/uploads/2021/07/vac-xin-vaxigrip-tetra.jpg",
    imgAlt: "Vắc xin Vaxigrip Tetra",
    title: "Vắc xin Vaxigrip Tetra (Pháp)"
  },
  {
    imgSrc: "https://vnvc.vn/wp-content/uploads/2019/11/vac-xin-prevenar-13.jpg",
    imgAlt: "Vắc xin Prevenar 13",
    title: "Vắc xin Prevenar 13 (Bỉ)"
  },
  {
    imgSrc: "https://vnvc.vn/wp-content/uploads/2018/06/vac-xin-Hexaxim-1.jpg",
    imgAlt: "Vắc xin Hexaxim",
    title: "Vắc xin Hexaxim (Pháp)"
  }
];

const CategoryUser = () => {
  return (
    <div className="vaccine-container ">
      <div className="header">
        <h2>Danh mục Vacxin</h2>
        <a href="#see-all" className="see-all">Xem tất cả</a>
      </div>
      <div className="vaccine-items">
        {vaccineItems.map((item, index) => (
          <div key={index} className="vaccine-item">
            <img src={item.imgSrc} alt={item.imgAlt} />
            <p>{item.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryUser;