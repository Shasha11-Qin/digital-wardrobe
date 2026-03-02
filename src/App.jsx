
import React, { useState, useEffect } from 'react';
import supabase from './supabaseClient';
import './App.css';

const categories = [
  { key: '全部', label: '全部衣物' },
  { key: '上装', label: '上装' },
  { key: '下装', label: '下装' },
  { key: '外套', label: '外套' },
  { key: '连体裙', label: '连体裙' },
  { key: '配饰鞋包', label: '配饰鞋包' },
];

function App() {
  const [clothes, setClothes] = useState([]);
  const [category, setCategory] = useState('全部');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClothes = async () => {
      setLoading(true);
      const { data, error } = await supabase.from('clothes').select('*');
      console.log('Supabase clothes data:', data); // 数据库里的数据是：
      if (error) {
        setClothes([]);
      } else {
        setClothes(data || []);
      }
      setLoading(false);
    };
    fetchClothes();
  }, []);

  // 分类过滤
  const filteredClothes = clothes.filter(item => {
    if (category === '全部') return true;
    return item.category === category;
  }).filter(item => {
    if (!search) return true;
    return (
      item.name?.includes(search) ||
      item.brand?.includes(search) ||
      item.color?.includes(search)
    );
  });

  return (
    <div className="wardrobe-container">
      <aside className="sidebar">
        <div className="sidebar-title">电子衣柜</div>
        <ul className="sidebar-menu">
          {categories.map(c => (
            <li
              key={c.key}
              className={category === c.key ? 'active' : ''}
              onClick={() => setCategory(c.key)}
            >
              {c.label}
            </li>
          ))}
        </ul>
      </aside>
      <main className="main-content">
        <h2 className="main-title">{categories.find(c => c.key === category)?.label}</h2>
        <div className="main-desc">管理你的所有服装单品</div>
        <div className="search-row">
          <input
            className="search-input"
            type="text"
            placeholder="搜索衣物名称、品牌、颜色..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div className="clothes-grid">
          {filteredClothes && filteredClothes.length > 0 ? (
            filteredClothes.map(item => (
              <div key={item.id} className="card">
                <img src={item.image_url || 'https://via.placeholder.com/150'} alt={item.name} />
                <h3>{item.name}</h3>
                <span>{item.category}</span>
              </div>
            ))
          ) : (
            <p>正在努力加载或衣柜空空...</p>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
