// إضافة Rino لـ VS Code
// الإكمال التلقائي للكلمات المفتاحية والمكونات

const vscode = require('vscode');

// ========== الكلمات المفتاحية ==========
const KEYWORDS = [
    { label: 'صفحة', detail: 'عنوان الصفحة', insertText: 'صفحة("عنوان")', kind: 14 },
    { label: 'نمط', detail: 'قسم CSS', insertText: 'نمط {\n  ${1}\n}', kind: 14 },
    { label: 'حالة', detail: 'متغيرات تفاعلية', insertText: 'حالة {\n  دع ${1:اسم} = ${2:0}\n}', kind: 14 },
    { label: 'منطق', detail: 'قسم الدوال', insertText: 'منطق {\n  دالة ${1:اسم}() {\n    ${2}\n  }\n}', kind: 14 },
    { label: 'دع', detail: 'متغير', insertText: 'دع ${1:اسم} = ${2:0}', kind: 14 },
    { label: 'ثابت', detail: 'ثابت', insertText: 'ثابت ${1:اسم} = ${2:0}', kind: 14 },
    { label: 'دالة', detail: 'تعريف دالة', insertText: 'دالة ${1:اسم}(${2}) {\n  ${3}\n}', kind: 14 },
    { label: 'أرجع', detail: 'إرجاع', insertText: 'أرجع ${1}', kind: 14 },
    { label: 'إذا', detail: 'شرط', insertText: 'إذا (${1:شرط}) {\n  ${2}\n}', kind: 14 },
    { label: 'وإلا', detail: 'وإلا', insertText: 'وإلا {\n  ${1}\n}', kind: 14 },
    { label: 'لكل', detail: 'حلقة', insertText: 'لكل (${1:عنصر} في ${2:قائمة}) {\n  ${3}\n}', kind: 14 },
    { label: 'حاول', detail: 'معالجة الأخطاء', insertText: 'حاول {\n  ${1}\n} أمسك (خطأ) {\n  ${2}\n}', kind: 14 },
    { label: 'اختبر', detail: 'اختبار', insertText: 'اختبر "${1:اسم}" {\n  توقع(${2:شرط})\n}', kind: 14 },
    { label: 'توقع', detail: 'تحقق', insertText: 'توقع(${1:شرط})', kind: 14 },
    { label: 'توقع_يساوي', detail: 'تحقق من المساواة', insertText: 'توقع_يساوي(${1:قيمة}, ${2:متوقع})', kind: 14 },
    { label: 'مكون', detail: 'مكون قابل لإعادة الاستخدام', insertText: 'مكون "${1:اسم}"(${2}) {\n  ${3}\n}', kind: 14 },
    { label: 'استيراد', detail: 'استيراد ملف', insertText: 'استيراد "${1:مسار}"', kind: 14 },
    { label: 'عند_الضغط', detail: 'حدث ضغط', insertText: 'عند_الضغط {\n  ${1}\n}', kind: 14 },
    { label: 'عند_التغيير', detail: 'حدث تغيير', insertText: 'عند_التغيير {\n  ${1}\n}', kind: 14 },
    { label: 'عند_المرور', detail: 'حدث مرور الفأرة', insertText: 'عند_المرور {\n  ${1}\n}', kind: 14 }
];

// ========== عناصر HTML ==========
const ELEMENTS = [
    { label: 'عنوان', detail: 'عنوان <h1>', insertText: 'عنوان("${1:نص}")', kind: 7 },
    { label: 'فقرة', detail: 'فقرة <p>', insertText: 'فقرة("${1:نص}")', kind: 7 },
    { label: 'زر', detail: 'زر <button>', insertText: 'زر("${1:نص}")', kind: 7 },
    { label: 'صورة', detail: 'صورة <img>', insertText: 'صورة("${1:رابط}")', kind: 7 },
    { label: 'رابط', detail: 'رابط <a>', insertText: 'رابط("${1:نص}", "${2:url}")', kind: 7 },
    { label: 'مدخل', detail: 'حقل إدخال', insertText: 'مدخل("${1:نص}", "${2:معرف}")', kind: 7 },
    { label: 'قائمة', detail: 'قائمة <ul>', insertText: 'قائمة("${1:معرف}") {\n  عنصر_قائمة("${2}")\n}', kind: 7 },
    { label: 'عنصر_قائمة', detail: 'عنصر قائمة', insertText: 'عنصر_قائمة("${1}")', kind: 7 },
    { label: 'قسم', detail: 'قسم <div>', insertText: 'قسم {\n  ${1}\n}', kind: 7 },
    { label: 'منطقة', detail: 'منطقة <section>', insertText: 'منطقة {\n  ${1}\n}', kind: 7 },
    { label: 'ترويسة', detail: 'ترويسة <header>', insertText: 'ترويسة {\n  ${1}\n}', kind: 7 },
    { label: 'تذييل', detail: 'تذييل <footer>', insertText: 'تذييل {\n  ${1}\n}', kind: 7 },
    { label: 'جدول', detail: 'جدول <table>', insertText: 'جدول {\n  صف {\n    خلية("${1}")\n  }\n}', kind: 7 },
    { label: 'صف', detail: 'صف جدول', insertText: 'صف {\n  خلية("${1}")\n}', kind: 7 },
    { label: 'خلية', detail: 'خلية جدول', insertText: 'خلية("${1}")', kind: 7 },
    { label: 'فيديو', detail: 'مشغل فيديو', insertText: 'فيديو("${1:رابط}")', kind: 7 },
    { label: 'موسيقى', detail: 'مشغل موسيقى', insertText: 'موسيقى("${1:رابط}")', kind: 7 },
    { label: 'فاصل_أفقي', detail: 'فاصل', insertText: 'فاصل_أفقي()', kind: 7 },
    { label: 'عريض', detail: 'نص عريض', insertText: 'عريض("${1}")', kind: 7 },
    { label: 'مائل', detail: 'نص مائل', insertText: 'مائل("${1}")', kind: 7 }
];

// ========== المكونات الجاهزة ==========
const COMPONENTS = [
    { label: 'زر_جميل', detail: 'زر متدرج جميل', insertText: 'زر_جميل("${1:نص}")', kind: 3 },
    { label: 'بطاقة', detail: 'بطاقة مع سعر', insertText: 'بطاقة("${1:عنوان}", "${2:وصف}", "${3:سعر}")', kind: 3 },
    { label: 'تنبيه_نجاح', detail: 'تنبيه أخضر', insertText: 'تنبيه_نجاح("${1:نص}")', kind: 3 },
    { label: 'تنبيه_خطأ', detail: 'تنبيه أحمر', insertText: 'تنبيه_خطأ("${1:نص}")', kind: 3 },
    { label: 'تنبيه_تحذير', detail: 'تنبيه أصفر', insertText: 'تنبيه_تحذير("${1:نص}")', kind: 3 },
    { label: 'تنبيه_معلومة', detail: 'تنبيه أزرق', insertText: 'تنبيه_معلومة("${1:نص}")', kind: 3 },
    { label: 'شريط_تقدم', detail: 'شريط تقدم', insertText: 'شريط_تقدم(${1:50})', kind: 3 },
    { label: 'فقرة_مهمة', detail: 'فقرة صفراء مهمة', insertText: 'فقرة_مهمة("${1:نص}")', kind: 3 },
    { label: 'رأس_جميل', detail: 'رأس متدرج', insertText: 'رأس_جميل("${1:عنوان}")', kind: 3 },
    { label: 'فاصل_جميل', detail: 'فاصل مزخرف', insertText: 'فاصل_جميل()', kind: 3 }
];

// ========== الدوال المدمجة ==========
const FUNCTIONS = [
    { label: 'طول', detail: 'عدد العناصر', insertText: 'طول(${1})', kind: 1 },
    { label: 'كبير', detail: 'تحويل لأحرف كبيرة', insertText: 'كبير(${1})', kind: 1 },
    { label: 'صغير', detail: 'تحويل لأحرف صغيرة', insertText: 'صغير(${1})', kind: 1 },
    { label: 'يحتوي', detail: 'هل يحتوي نصًا؟', insertText: 'يحتوي(${1}, "${2}")', kind: 1 },
    { label: 'استبدل', detail: 'استبدال نص', insertText: 'استبدل(${1}, "${2}", "${3}")', kind: 1 },
    { label: 'جذر', detail: 'الجذر التربيعي', insertText: 'جذر(${1})', kind: 1 },
    { label: 'قوة', detail: 'أ أس ب', insertText: 'قوة(${1}, ${2})', kind: 1 },
    { label: 'قوس', detail: 'تقريب', insertText: 'قوس(${1})', kind: 1 },
    { label: 'أرضي', detail: 'تقريب لأسفل', insertText: 'أرضي(${1})', kind: 1 },
    { label: 'سقف', detail: 'تقريب لأعلى', insertText: 'سقف(${1})', kind: 1 },
    { label: 'مطلق', detail: 'القيمة المطلقة', insertText: 'مطلق(${1})', kind: 1 },
    { label: 'أصغر', detail: 'الأصغر', insertText: 'أصغر(${1}, ${2})', kind: 1 },
    { label: 'أكبر', detail: 'الأكبر', insertText: 'أكبر(${1}, ${2})', kind: 1 },
    { label: 'عدد', detail: 'تحويل لرقم', insertText: 'عدد(${1})', kind: 1 },
    { label: 'مفاتيح', detail: 'مفاتيح قاموس', insertText: 'مفاتيح(${1})', kind: 1 },
    { label: 'قيم', detail: 'قيم قاموس', insertText: 'قيم(${1})', kind: 1 },
    { label: 'أضف', detail: 'إضافة لقائمة', insertText: 'أضف(${1}, ${2})', kind: 1 },
    { label: 'احذف', detail: 'حذف من قائمة', insertText: 'احذف(${1}, ${2})', kind: 1 },
    { label: 'اعكس', detail: 'عكس القائمة', insertText: 'اعكس(${1})', kind: 1 },
    { label: 'دمج', detail: 'دمج عناصر بفاصل', insertText: 'دمج(${1}, " - ")', kind: 1 },
    { label: 'أول', detail: 'العنصر الأول', insertText: 'أول(${1})', kind: 1 },
    { label: 'آخر', detail: 'العنصر الأخير', insertText: 'آخر(${1})', kind: 1 },
    { label: 'رتب', detail: 'ترتيب القائمة', insertText: 'رتب(${1})', kind: 1 },
    { label: 'مدى', detail: 'مدى من رقمين', insertText: 'مدى(${1}, ${2})', kind: 1 },
    { label: 'اطبع', detail: 'طبع في Console', insertText: 'اطبع(${1})', kind: 1 },
    { label: 'اقرأ', detail: 'قراءة قيمة حقل', insertText: 'اقرأ("${1:معرف}")', kind: 1 },
    { label: 'احفظ', detail: 'حفظ محلي', insertText: 'احفظ("${1:مفتاح}", ${2:قيمة})', kind: 1 },
    { label: 'اقرأ_محلي', detail: 'قراءة من الحفظ المحلي', insertText: 'اقرأ_محلي("${1:مفتاح}")', kind: 1 },
    { label: 'اجلب', detail: 'جلب من API', insertText: 'اجلب("${1:url}", "${2:متغير}")', kind: 1 },
    { label: 'اجلب_نص', detail: 'جلب نص من API', insertText: 'اجلب_نص("${1:url}", "${2:متغير}")', kind: 1 }
];

// ========== الألوان الجاهزة ==========
const COLORS = [
    { label: 'أحمر', kind: 12 },
    { label: 'أزرق', kind: 12 },
    { label: 'أخضر', kind: 12 },
    { label: 'أصفر', kind: 12 },
    { label: 'أبيض', kind: 12 },
    { label: 'أسود', kind: 12 },
    { label: 'رمادي', kind: 12 },
    { label: 'برتقالي', kind: 12 },
    { label: 'بنفسجي', kind: 12 },
    { label: 'وردي', kind: 12 },
    { label: 'بني', kind: 12 },
    { label: 'ذهبي', kind: 12 },
    { label: 'سماوي', kind: 12 },
    { label: 'تركوازي', kind: 12 },
    { label: 'مرجاني', kind: 12 }
];

// ========== خصائص CSS ==========
const CSS_PROPS = [
    { label: 'لون', insertText: 'لون: "${1:أحمر}"', kind: 9 },
    { label: 'خلفية', insertText: 'خلفية: "${1:أزرق}"', kind: 9 },
    { label: 'حجم', insertText: 'حجم: "${1:20}"', kind: 9 },
    { label: 'حشوة', insertText: 'حشوة: "${1:10}"', kind: 9 },
    { label: 'هامش', insertText: 'هامش: "${1:10}"', kind: 9 },
    { label: 'استدارة', insertText: 'استدارة: "${1:5}"', kind: 9 },
    { label: 'محاذاة', insertText: 'محاذاة: "${1:وسط}"', kind: 9 },
    { label: 'عرض', insertText: 'عرض: "${1:300}"', kind: 9 },
    { label: 'ارتفاع', insertText: 'ارتفاع: "${1:200}"', kind: 9 },
    { label: 'حد', insertText: 'حد: "${1:2}"', kind: 9 },
    { label: 'وزن', insertText: 'وزن: "${1:عريض}"', kind: 9 },
    { label: 'ظل', insertText: 'ظل: "${1:0 4px 8px gray}"', kind: 9 }
];

// ========== استخراج المكونات والدوال من الملف ==========
function extractUserDefinitions(document) {
    const text = document.getText();
    const items = [];

    // استخراج المكونات: مكون "اسم"(
    const componentRegex = /مكون\s+"([^"]+)"\s*\(([^)]*)\)/g;
    let match;
    while ((match = componentRegex.exec(text)) !== null) {
        const name = match[1];
        const params = match[2].trim();
        items.push({
            label: name,
            detail: `مكون: (${params})`,
            insertText: params ? `${name}(\${1})` : `${name}()`,
            kind: 3
        });
    }

    // استخراج الدوال: دالة اسم(
    const funcRegex = /دالة\s+([^\s(]+)\s*\(([^)]*)\)/g;
    while ((match = funcRegex.exec(text)) !== null) {
        const name = match[1];
        const params = match[2].trim();
        items.push({
            label: name,
            detail: `دالة: (${params})`,
            insertText: params ? `${name}(\${1})` : `${name}()`,
            kind: 2
        });
    }

    // استخراج المتغيرات: دع اسم =
    const varRegex = /(?:دع|ثابت)\s+([^\s=]+)\s*=/g;
    while ((match = varRegex.exec(text)) !== null) {
        const name = match[1];
        items.push({
            label: name,
            detail: 'متغير',
            insertText: name,
            kind: 5
        });
    }

    return items;
}

// ========== مزوّد الإكمال ==========
function activate(context) {
    console.log('Rino Extension Active');

    const provider = vscode.languages.registerCompletionItemProvider(
        'rino',
        {
            provideCompletionItems(document, position) {
                const completions = [];

                // الكلمات المفتاحية
                KEYWORDS.forEach(kw => {
                    const item = new vscode.CompletionItem(kw.label, kw.kind);
                    item.detail = kw.detail;
                    item.insertText = new vscode.SnippetString(kw.insertText);
                    completions.push(item);
                });

                // العناصر
                ELEMENTS.forEach(el => {
                    const item = new vscode.CompletionItem(el.label, el.kind);
                    item.detail = el.detail;
                    item.insertText = new vscode.SnippetString(el.insertText);
                    completions.push(item);
                });

                // المكونات الجاهزة
                COMPONENTS.forEach(c => {
                    const item = new vscode.CompletionItem(c.label, c.kind);
                    item.detail = c.detail;
                    item.insertText = new vscode.SnippetString(c.insertText);
                    completions.push(item);
                });

                // الدوال
                FUNCTIONS.forEach(f => {
                    const item = new vscode.CompletionItem(f.label, f.kind);
                    item.detail = f.detail;
                    item.insertText = new vscode.SnippetString(f.insertText);
                    completions.push(item);
                });

                // الألوان
                COLORS.forEach(c => {
                    const item = new vscode.CompletionItem(c.label, c.kind);
                    item.detail = 'لون';
                    item.insertText = c.label;
                    completions.push(item);
                });

                // خصائص CSS
                CSS_PROPS.forEach(p => {
                    const item = new vscode.CompletionItem(p.label, p.kind);
                    item.detail = 'خاصية CSS';
                    item.insertText = new vscode.SnippetString(p.insertText);
                    completions.push(item);
                });

                // المكونات والدوال والمتغيرات المُعرَّفة في الملف
                const userDefs = extractUserDefinitions(document);
                userDefs.forEach(d => {
                    const item = new vscode.CompletionItem(d.label, d.kind);
                    item.detail = d.detail;
                    if (d.insertText.includes('${')) {
                        item.insertText = new vscode.SnippetString(d.insertText);
                    } else {
                        item.insertText = d.insertText;
                    }
                    completions.push(item);
                });

                return completions;
            }
        },
        '.', '"', '('
    );

    context.subscriptions.push(provider);
}

function deactivate() {}

module.exports = {
    activate,
    deactivate
};