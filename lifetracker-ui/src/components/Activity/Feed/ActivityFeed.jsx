import * as React from "react"
import "./Feed.css"
import SummaryStat from "./SummaryStat"

export default function ActivityFeed({totalCaloriesPerDay = [], avgCaloriesPerCategory = []}) {
    const limit = avgCaloriesPerCategory.size < 6 ? avgCaloriesPerCategory.size : 6

    for (let i = 0; i < limit; i++) {
        avgCaloriesPerCategory.push([i])
    }
   

    return (
        <div className = "activity-feed">
            <h1> Coming soon! </h1>

            {/* <div className="per-category">
                <h4> Average Calories Per Category: </h4>

                {avgCaloriesPerCategory.map((calories) => {
                    <SummaryStat 
                        stat = {Math.round(calories * 10) / 10} 
                        label = {calories}
                        substat = {calories}  // pass category
                        />
                    })
                }
            </div>

            <div className = "per-day">
                <h4> Total Calories Per Day </h4>

                {totalCaloriesPerDay.map((calories) => {
                    <SummaryStat
                        stat = {Math.floor(calories)}
                        label = {calories}
                        substat = {calories}  // pass date (dd/mm/yyyy)
                    />
                    })
                }
            </div> */}
        </div>
    )

}