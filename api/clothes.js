import { createClient } from '@supabase/supabase-js';

export default async function handler(req, res) {
  // 1. 限制请求方法
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // 2. 在函数内部读取变量，防止初始化时崩溃
  const supabaseUrl = process.env.VITE_SUPABASE_URL;
  const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

  // 3. 严格检查变量是否存在
  if (!supabaseUrl || !supabaseKey) {
    return res.status(500).json({ 
      error: '环境变量缺失，请检查 Vercel 项目设置中的 VITE_SUPABASE_URL 和 VITE_SUPABASE_ANON_KEY' 
    });
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseKey);
    
    // 4. 执行查询
    const { data, error } = await supabase.from('clothes').select('*');
    
    if (error) {
      return res.status(500).json({ error: error.message });
    }

    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ error: '服务器内部错误: ' + err.message });
  }
}