import { createClient } from '@supabase/supabase-js';

export default async function handler(req, res) {
  try {
    const url = process.env.VITE_SUPABASE_URL;
    const key = process.env.VITE_SUPABASE_ANON_KEY;

    // 1. 检查环境变量
    if (!url || !key) {
      return res.status(500).json([]); // 环境变量缺失也返回空数组，防止前端崩溃
    }

    // 2. 初始化 Supabase 客户端
    const supabase = createClient(url, key);

    // 3. 执行数据库查询
    const { data, error } = await supabase
      .from('clothes')
      .select('*');

    // 4. 处理数据库报错
    if (error) {
      console.error('Supabase Error:', error.message);
      return res.status(500).json([]); // 出错返回空数组
    }

    // 5. 成功返回数据数组
    return res.status(200).json(data || []); 

  } catch (e) {
    console.error('Server Error:', e.message);
    return res.status(500).json([]); // 捕获到致命错误也返回空数组
  }
}