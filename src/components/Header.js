import React from "react";

const Header = () => (
    <div className="header">
      <div className="container">
        <div className="project-description">
          <h1>Тестовое задание</h1>
          <div>
            Автор{" "}
            <a
                href="https://sitewanted.ru/cv"
                className="author"
                target="_blank"
                rel="noopener noreferrer"
            >
              Артемий Егоров
            </a>
          </div>
          <time className="date">Дата: 30/10/2019</time>
          <div className="time">Затраченное время: 4ч.</div>
        </div>
      </div>
    </div>
);

export default Header;
