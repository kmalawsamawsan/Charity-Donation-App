import path from 'path';
import { fileURLToPath } from 'url';

// تعريف __dirname و __filename للبيئة ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
    entry: './src/index.js', // نقطة الدخول الرئيسية لمشروعك
    output: {
        path: path.resolve(__dirname, 'dist'), // مجلد الإخراج
        filename: 'bundle.js', // ملف الإخراج
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/, // أنواع الملفات التي ستقوم Webpack بمعالجتها
                exclude: /node_modules/, // استثناء مجلد node_modules
                use: {
                    loader: 'babel-loader', // محمل Babel لتحويل الشيفرة البرمجية
                },
            },
            {
                test: /\.css$/, // أنواع الملفات التي ستقوم Webpack بمعالجتها
                use: ['style-loader', 'css-loader'], // محمل CSS
            },
        ],
    },
    resolve: {
        extensions: ['.js', '.jsx'], // الامتدادات التي ستتعامل معها Webpack
    },
    devServer: {
        static: path.join(__dirname, 'dist'),
        compress: true,
        port: 9000, // المنفذ الذي سيعمل عليه خادم التطوير
    },
};
