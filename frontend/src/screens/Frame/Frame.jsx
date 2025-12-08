import React, { useState, useEffect } from 'react';
import { ArrowRightIcon, ClockIcon } from "lucide-react"; 

const decorativeQuoteLogos = [
    { top: "top-[0%]", left: "left-[0%]", rotation: "" }, 
    { top: "top-[75%]", left: "left-[5%]", rotation: "" }, 
    { top: "top-[10%]", left: "right-[0%]", rotation: "" }, 
    { top: "top-[70%]", left: "right-[5%]", rotation: "" }, 
];

export const Card = ({ className = "", children }) => (
    <div className={`rounded-xl border border-gray-200 bg-white text-gray-900 shadow-md ${className}`}>
        {children}
    </div>
);

export const CardHeader = ({ className = "", children }) => (
    <div className={`flex flex-col space-y-1.5 p-6 ${className}`}>
        {children}
    </div>
);

export const CardTitle = ({ className = "", children }) => (
    <h3 className={`text-2xl font-semibold leading-none tracking-tight ${className}`}>
        {children}
    </h3>
);

export const CardContent = ({ className = "", children }) => (
    <div className={`p-6 pt-0 ${className}`}>
        {children}
    </div>
);

const Button = ({ className = "", children, onClick, variant = 'primary' }) => {
    let baseClasses = `inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors 
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 
                disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2`;
    
    let variantClasses = 'bg-[#1a3a5a] text-white hover:bg-[#254C75] focus-visible:ring-[#254C75]';
    
    if (variant === 'secondary') {
        variantClasses = 'bg-gray-100 text-gray-800 hover:bg-gray-200 focus-visible:ring-gray-300';
    }

    return (
        <button 
            onClick={onClick} 
            className={`${baseClasses} ${variantClasses} ${className}`}
        >
            {children}
        </button>
    );
};

// AI LEARNING INSIGHT PAGE

// 1. ConsistencyScoreSection 
const ConsistencyScoreSection = ({ score = 0, insight = 'Data konsistensi belum tersedia.', insightText = 'Ayo tingkatkan konsistensi belajarmu!' }) => {
    const chartColor = '#283e75'; 
    const backgroundColor = '#e0e0e0'; 
    const angle = score * 3.6; 
    
    return (
        <section className="w-full py-4 lg:py-8">
            <Card className="w-full bg-[#fff6f6] rounded-xl lg:rounded-[32px] shadow-xl border-0">  
                <CardContent className="p-6 lg:p-8"> 
                    <div className="mb-4 lg:mb-6 text-center lg:text-left"> 
                        <h2 className="font-['Inter',Helvetica] font-semibold text-xl lg:text-2xl text-black mb-1"> 
                            Consistency Score
                        </h2>
                        <p className="font-['Open_Sans',Helvetica] font-normal text-xs lg:text-sm text-black max-w-2xl"> 
                            Ketahui seberapa rutin kamu belajar dan ayo tingkatkan konsistensimu perlahan
                        </p>
                    </div>
                        
                    <hr className="mb-4 lg:mb-6 border-t border-gray-300" /> 
                        
                    <div className="flex flex-col lg:flex-row items-center lg:items-start justify-center gap-6 lg:gap-12"> 
                        <div className="flex flex-col items-center flex-shrink-0">
                            <h3 className="font-['Inter',Helvetica] font-semibold text-base lg:text-xl text-center mb-3 text-[#0d1c31]"> 
                                Skor Konsistensi Anda
                            </h3>
                            <div className="relative w-32 h-32 lg:w-40 lg:h-40 rounded-full flex items-center justify-center mb-3"> 
                                <div
                                    className="w-full h-full rounded-full"
                                    style={{
                                        background: `conic-gradient(${chartColor} ${angle}deg, ${backgroundColor} 0deg)`,
                                        boxShadow: `0 0 8px rgba(0, 0, 0, 0.1)`,
                                    }}
                                >
                                </div>
                                
                                <div className="absolute inset-0 m-auto w-24 h-24 lg:w-32 lg:h-32 rounded-full bg-[#fff6f6] flex items-center justify-center shadow-inner"> 
                                    <span className="font-bold text-3xl lg:text-4xl text-[#0d1c31]"> 
                                        {score}
                                        <small className="text-lg">%</small> 
                                    </span>
                                </div>
                            </div>
                            <p className="font-['Open_Sans',Helvetica] font-normal text-xs lg:text-sm text-black/80 max-w-[200px] text-center italic"> 
                                "{insightText}"
                            </p>
                        </div>
                        
                        <div className="w-full lg:flex-1 flex flex-col items-center lg:items-start text-center lg:text-left">
                            <h3 className="font-['Inter',Helvetica] font-semibold text-base lg:text-xl text-black mb-3 hidden lg:block"> 
                                Tingkatkan Konsistensi
                            </h3>
                            <p className="font-['Open_Sans',Helvetica] font-normal text-sm lg:text-base text-black/90 leading-relaxed mb-4 lg:mb-6"> 
                                {insight}
                                Pelajari lebih lanjut tips dan trik untuk mempertahankan momentum belajarmu!
                            </p>

                            <Button className="bg-[#283e75] hover:bg-[#1f3160] rounded-full h-8 lg:h-10 px-6 gap-1"> 
                                <span className="font-['Open_Sans',Helvetica] font-normal text-[#fff6f6] text-xs lg:text-sm tracking-[0] leading-[normal]"> 
                                    SELENGKAPNYA
                                </span>
                            </Button>
                        </div>
                    </div>
                    
                </CardContent>
            </Card>
        </section>
    );
};


// 2. MostActiveTimeSection 
const MostActiveTimeSection = ({ timeData = [], insightText = 'Optimalkan jam fokus terbaikmu!' }) => {
    
    const mapTimeToColor = (data) => {
        return data.map(time => {
            const timeLabel = time.label.toLowerCase();
            let colorClass = 'bg-gray-400'; 

            if (timeLabel.includes('morning')) {
                colorClass = 'bg-amber-400'; 
            } else if (timeLabel.includes('afternoon')) {
                colorClass = 'bg-blue-400'; 
            } else if (timeLabel.includes('evening') || timeLabel.includes('night')) {
                colorClass = 'bg-indigo-700';
            }
            
            return {
                ...time,
                color: colorClass 
            };
        });
    };

    const coloredTimeData = mapTimeToColor(timeData);


    // insight yang mengandung persentase 
    const getActiveTimeInsight = (data, baseInsight) => {
        if (!data || data.length === 0) return 'Data waktu aktif belum tersedia. Mulai belajar untuk melihat polanya!';
        
        const mostActive = data.reduce((prev, current) => 
          (prev.fillPercentage > current.fillPercentage) ? prev : current
        );
        const finalInsight = baseInsight.replace(
            /Manfaatkan waktu ini untuk materi yang paling menantang!/, 
            `Kamu memiliki tingkat aktivitas ${mostActive.fillPercentage}% di waktu ini. Manfaatkan waktu ini untuk materi yang paling menantang!`
        );
        return `Waktu belajarmu yang paling produktif adalah ${mostActive.label.split('(')[0].trim()}. ${finalInsight}`;
    };

    const finalInsight = getActiveTimeInsight(coloredTimeData, insightText); 

    return (
        <section className="relative w-full">
            <Card className="bg-[#fff6f6] rounded-3xl lg:rounded-[58px] shadow-xl border-0">
                <CardContent className="p-0">
                    <div className="p-6 lg:p-8"> 
                        <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between mb-4 lg:mb-6 gap-3">
                            <div className="flex-1 order-2 lg:order-1 text-center lg:text-left">
                                <h2 className="font-['Inter',Helvetica] font-semibold text-xl lg:text-2xl text-black mb-1">
                                    Most Active Time
                                </h2>
                                <p className="font-['Open_Sans',Helvetica] font-normal text-xs lg:text-sm text-black max-w-2xl">
                                    Kenali pola waktu belajarmu dan optimalkan jam fokus terbaikmu
                                </p>
                            </div>
                            <ClockIcon
                                className="w-12 h-12 lg:w-16 lg:h-16 text-black flex-shrink-0 order-1 lg:order-2"
                                strokeWidth={1.5}
                            />
                        </div>

                        <hr className="mb-4 lg:mb-6 border-t border-gray-300" /> 
                        
                        <Card className="bg-[#fff6f6] rounded-xl lg:rounded-[58px] shadow-lg border-0 mb-4 lg:mb-6">
                            <CardContent className="p-3 lg:p-4">
                                <div className="relative h-32 lg:h-40 flex items-end justify-around"> 
                                    
                                    {coloredTimeData.map((time, index) => ( 
                                        <div
                                            key={index}
                                            className="flex flex-col items-center gap-1 w-1/4 max-w-[80px] h-full"
                                        >
                                            
                                            {/* Bar Grafik Dinamis - Kontainer Utama Bar */}
                                            <div className="w-full h-full border border-solid border-black/30 rounded-lg shadow-inner relative overflow-hidden bg-gray-200/50">
                                                <div 
                                                    className={`absolute bottom-0 w-full ${time.color} transition-all duration-500 hover:opacity-80`}
                                                    style={{ height: `${time.fillPercentage}%` }}
                                                >
                                                </div>
                                            </div>
                                                
                                            {/* Label Waktu */}
                                            <span className="font-['Open_Sans',Helvetica] font-normal text-xs lg:text-sm text-black tracking-[0] leading-[normal] text-center">
                                                {time.label.split('(')[0].trim()}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Ringkasan & Tombol */}
                        <Card className="bg-[#fff6f6] rounded-xl lg:rounded-[58px] shadow-lg border-0">
                            <CardContent className="p-3 lg:p-4">
                                <div className="relative text-center">
                                    <p 
                                        className="font-['Inter',Helvetica] font-normal text-xs lg:text-base text-black tracking-[0] leading-normal mb-3 lg:mb-4"
                                        dangerouslySetInnerHTML={{ __html: finalInsight }}
                                    />
                                            
                                    <Button className="bg-[#283e75] hover:bg-[#283e75]/90 rounded-full h-8 lg:h-10 px-6 lg:px-8 gap-1">
                                        <span className="font-['Open_Sans',Helvetica] font-normal text-[#fff6f6] text-xs lg:text-sm tracking-[0] leading-[normal]">
                                            SELENGKAPNYA
                                        </span>
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </CardContent>
            </Card>
        </section>
    );
};
// 3. LearningPatternSection 
const generateConicGradient = (data) => {
    let gradientString = 'conic-gradient(';
    let currentAngle = 0;
    
    data.forEach((item, index) => {
        const angle = item.percentage * 3.6;
        const endAngle = currentAngle + angle;
        
        gradientString += `${item.color} ${currentAngle}deg ${endAngle}deg${index < data.length - 1 ? ',' : ''}`;
        currentAngle = endAngle;
    });
    
    gradientString += ')';
    return gradientString;
};


const LearningPatternSection = ({ learningPatternData = [], mainPattern = { label: "N/A" }, description = 'Pola belajar belum terdeteksi.' }) => {
    
    // Fallback jika data kosong
    const dataToDisplay = learningPatternData.length > 0 ? learningPatternData : [
        { label: "Data not available", percentage: 100, color: "#ccc" }
    ];

    const pieChartStyle = {
        background: generateConicGradient(dataToDisplay),
    };

    return (
        <section className="w-full py-8 px-6">
            
            <div className="mb-8 text-left">
                <h2 className="font-['Inter',Helvetica] font-bold text-2xl text-black mb-1.5">
                    Learning Pattern
                </h2>
                <p className="font-['Open_Sans',Helvetica] font-normal text-base text-black/70">
                    Temukan kategori yang mencerminkan caramu belajar.
                </p>
            </div>
                
            <div className="flex flex-col lg:flex-row items-center gap-10 mb-8">
                <div className="flex items-center gap-6 w-fit lg:w-auto">
                    <div className="flex-shrink-0 relative w-32 h-32 rounded-full overflow-hidden shadow-xl">
                        <div
                            className="w-full h-full"
                            style={pieChartStyle}
                        >
                        </div>
                    </div>
                    <div className="flex flex-col space-y-3 w-max"> 
                        {dataToDisplay.map((item, index) => (
                            <div key={index} className="flex items-center gap-2">
                                <span 
                                    className="w-4 h-4 rounded-sm flex-shrink-0"
                                    style={{ backgroundColor: item.color }}
                                ></span>
                                {/* Label */}
                                <span className="font-['Open_Sans',Helvetica] font-medium text-sm lg:text-base text-black/90 whitespace-nowrap">
                                    {item.label} {item.percentage !== undefined ? `(${item.percentage}%)` : ''}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Pola Belajar Utama */}
                <div className="text-center w-full lg:text-left lg:w-auto flex-shrink-0">
                    <p className="font-['Inter',Helvetica] font-semibold text-base text-black/70 mb-1">Pola Belajar Utama:</p>
                    <h3 className="font-['Inter',Helvetica] font-bold text-2xl text-[#0d1c31]">
                        {mainPattern.label}
                    </h3>
                </div>
            </div>
                
            {/* Ringkasan & Tombol */}
            <div className="relative pt-6 text-center border-t border-black/10"> 
                <p className="font-['Inter',Helvetica] font-normal text-sm lg:text-base text-black/80 tracking-[0] leading-normal mb-6 max-w-2xl mx-auto">
                    {description}
                </p>
                    
                <Button className="bg-[#283e75] hover:bg-[#1f3160] rounded-full h-9 px-7 gap-1.5">
                    <span className="font-['Open_Sans',Helvetica] font-normal text-[#fff6f6] text-sm lg:text-base tracking-[0] leading-[normal]">
                        SELENGKAPNYA
                    </span>
                </Button>
            </div>
        </section>
    );
};


// 4. ConsistentLearnerSection (Quote Section) 
const ConsistentLearnerSection = () => {
    const logoColor = "#25586e";
    const bgColor = "#fcf9f2";
    const shadowSize = '5px'; 
    const finalShadow = `0 0 0 ${shadowSize} ${bgColor}, 0 0 0 ${parseInt(shadowSize) + 1}px ${logoColor}`;

    return (
        <div className="w-full overflow-hidden" style={{ backgroundColor: bgColor }}> 
            <div className="relative py-12 lg:py-20 max-w-5xl mx-auto px-4 lg:px-8">
                {decorativeQuoteLogos.map((logo, index) => (
                    <div 
                        key={index} 
                        className={`hidden lg:block absolute ${logo.top} ${logo.left} w-20 h-20`}
                        style={{ zIndex: 1 }}
                    >
                        <div className="relative w-full h-full flex items-center justify-center">
                            <div 
                                className={`w-full h-full rounded-full flex items-center justify-center`}
                                style={{
                                    backgroundColor: logoColor,
                                    boxShadow: finalShadow,
                                }}
                            >
                                <span className="text-white font-serif text-4xl leading-none font-bold">g</span>
                            </div>
                        </div>
                    </div>
                ))}
                
                <section 
                    className={`font-['Open_Sans',Helvetica] font-semibold text-lg lg:text-xl tracking-[0] leading-normal text-center max-w-[884px] mx-auto relative z-20`}
                    style={{ lineHeight: '1.5', color: logoColor }}
                >
                    "Hasil yang luar biasa datang bukan dari tindakan yang besar, tetapi dari konsistensi tindakan-tindakan kecil."
                </section>
                <div 
                    className={`font-['Inter',Helvetica] font-semibold text-sm lg:text-base text-center mt-8 relative z-20`}
                    style={{ color: logoColor }}
                >
                    – Thompson Abbot -
                </div>
                
            </div>
            <div className="w-full h-12 lg:h-16 bg-[#25586e]" /> 
        </div>
    );
};

// HELPER FUNCTION

const getMainPattern = (data) => {
    if (!data || data.length === 0) return { label: "N/A", percentage: 0 };
    return data.reduce((prev, current) => 
        (prev.percentage > current.percentage) ? prev : current
    );
};


// FIXED FRAME COMPONENT (The Insight Page) 

export function Frame({ onGoBack, userData = {} }) {
    const imagePath = "https://placehold.co/100x100/1a3a5a/FFF1DF?text=G"; 
    const G_Logo = imagePath;
    
    // Akses data dengan aman menggunakan optional chaining
    const learningPatternData = userData.learning_pattern?.data || [];
    const mainPattern = getMainPattern(learningPatternData);

    return (
        <div className="bg-[#FFF1DF] min-h-screen font-sans">
            <div className="bg-gradient-to-br from-[#0d1c31] to-[#1a3a5a] px-6 py-10 relative overflow-hidden">
                
                {/* Inline CSS for fonts */}
                <style>{`
                    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=Open+Sans:wght@400;600&display=swap');
                    .font-sans { font-family: 'Inter', sans-serif; }
                `}</style>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <button 
                        onClick={onGoBack} 
                        className="mb-6 flex items-center text-white/90 hover:text-white transition text-sm"
                    >
                        <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            className="h-5 w-5 mr-1" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor" 
                            strokeWidth={2}
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Kembali ke Dashboard
                    </button>

                    <div className="flex items-start justify-between gap-8">
                        <div className="flex-1 max-w-md">
                            <h1 className="text-white text-3xl font-bold mb-3 leading-snug">
                                Welcome Back to AI Learning Insight
                            </h1>
                            <p className="text-white/90 text-sm leading-relaxed">
                                Lihat kebiasaan belajarmu, evaluasi efektivitasmu, 
                                dan temukan cara belajar yang lebih tepat
                            </p>
                        </div>

                        {/* Dekoratip */}
                        <div className="hidden lg:flex absolute top-0 bottom-0 right-0 transform translate-x-1/4 items-center">
                            <div className="relative w-[200px] h-[200px] transform scale-110">
                                <div className="absolute inset-0 w-full h-full rounded-full bg-transparent 
                                    border-[10px] border-[#FFF1DF] border-opacity-70 
                                    transform scale-[1.15] shadow-xl">
                                </div>
                                <div className="absolute inset-0 w-[200px] h-[200px] rounded-full flex items-center justify-center 
                                    bg-gradient-to-br from-[#122941] to-[#254C75] z-10 
                                    shadow-2xl shadow-blue-900/50">
                                    <div className="w-[170px] h-[170px] rounded-full flex items-center justify-center 
                                        bg-gradient-to-br from-[#1A3A5A] to-[#0d1c31] overflow-hidden">
                                        <img 
                                            src={G_Logo} 
                                            alt="G Logo"
                                            className="w-full h-full object-contain p-4" 
                                            onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/170x170/1A3A5A/FFF1DF?text=LOGO"; }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="max-w-7xl mx-auto px-6 py-8 space-y-10">

                {/* Robot + Welcome message */}
                <div className="bg-white rounded-2xl shadow-lg p-6 flex items-center justify-between gap-6">
                    <img 
                        src="/group-19.png"
                        alt="Robot Illustration"
                        className="w-24 h-24 object-contain flex-shrink-0"
                        onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/128x128/FFFFFF/0d1c31?text=ROBOT+AI"; }}
                    />
                    <div className="flex-1">
                        <h2 className="text-xl font-bold text-[#0d1c31] mb-1">
                            Hallo {userData.display_name || 'Pengguna'}, ini catatan learning kamu!
                        </h2>
                        <p className="text-sm text-gray-600">
                            Pantau perkembangan dan kebiasaan belajar kamu setiap hari
                        </p>
                    </div>
                </div>

                {/* Most Active Time Section */}
                <MostActiveTimeSection 
                    timeData={userData.most_active_time?.data}
                    insightText={userData.most_active_time?.description}
                />

                {/* Consistency Score Section */}
                <Card className="bg-[#fff6f6] rounded-[58px] shadow-[0px_4px_30px_#00000040] border-0">
                    <CardContent className="p-12">
                        <div className="flex flex-col lg:flex-row items-start gap-16">
                            <div className="flex-1">
                                <ConsistencyScoreSection 
                                    score={userData.consistency_score}
                                    insight={userData.consistency?.description}
                                    insightText={userData.insight_text}
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Learning Pattern Section */}
                <Card className="bg-[#fff6f6] rounded-[58px] shadow-[0px_4px_30px_#00000040] border-0">
                    <CardContent className="p-8 lg:p-12"> 
                        <div className="flex flex-col lg:flex-row items-center justify-around gap-16">
                            <LearningPatternSection 
                                learningPatternData={learningPatternData}
                                mainPattern={mainPattern}
                                description={userData.learning_pattern?.description}
                            />
                        </div>
                    </CardContent>
                </Card>


                {/* Consistent Learner Section (Quote) */}
                <div className="mt-10"> 
                    <ConsistentLearnerSection />
                </div>
                
            </div>

        </div>
    );
}