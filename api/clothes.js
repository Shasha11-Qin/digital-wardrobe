import { createClient } from '@supabase/supabase-js';

export default async function handler(req, res) {
  try {
    const url = process.env.VITE_SUPABASE_URL;
    const key = process.env.VITE_SUPABASE_ANON_KEY;
    
    // 暴力测试：如果变量拿不到，直接返回具体的报错给前端
    if (!url || !key) {
      return res.status(500).json({ 
        debug: "变量丢失", 
        hasUrl: !!url, 
        hasKey: !!key 
      });
    }

    return res.status(200).json({ message: "后端环境正常，准备连接Supabase" });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}