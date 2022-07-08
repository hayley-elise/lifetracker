export default function SummaryStat({stat, label, substat}) {

    return (
        <div className = "summary-stat">
            <p className = "primary-statistic"> {stat} </p>
            <p className = "stat-label"> {label.toString()} </p>
            <p className = "secondary-statistic"> {substat} </p>
        </div>
    )    
}