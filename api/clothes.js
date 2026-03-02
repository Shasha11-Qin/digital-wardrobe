// api/clothes.js
export default function handler(req, res) {
  // 手写你在数据库里的那三件衣服
  const mockClothes = [
    {
      id: "30ced5d1",
      name: "外套",
      category: "外套",
      season: "秋季",
      color: "棕色",
      image_url: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500"
    },
    {
      id: "5f0b95ec",
      name: "白色T",
      category: "上衣",
      season: "夏季",
      color: "白色",
      image_url: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=500"
    },
    {
      id: "f0c472eb",
      name: "蓝色牛仔裤",
      category: "下装",
      season: "夏季",
      color: "蓝色",
      image_url: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500"
    }
  ];

  // 无论如何都返回 200 和这组数据
  res.status(200).json(mockClothes);
}