import React from "react";

const Header = () => {
    return (
        <header className="Header">
            <p className="HeaderText">Куди піти в Запоріжжі?</p>
            <ul className="Menu">
                <li className="MenuItem"><a href="/">Головна</a></li>
                <li className="MenuItem"><a href="/calendar">Календар</a></li>
                <li className="MenuItem"><a href="/statistics">Статистика</a></li>
            </ul>
        </header>
    )
}

export default Header;