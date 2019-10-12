import React from "react"
import { connect } from "react-redux"
import 'react-dates/initialize'
import { DateRangePicker } from 'react-dates'
import 'react-dates/lib/css/_datepicker.css'
import { setTextFilter, sortByAmount, sortByDate, setStartDate, setEndDate } from "../actions/filters"
import uuid from "uuid"


class ExpenseListFilters extends React.Component {
    state = {
        calenderFocused: null
    }

    onDatesChange = ({ startDate, endDate }) => {
        this.props.dispatch(setStartDate(startDate))
        this.props.dispatch(setEndDate(endDate))
    }

    onFocusChange = (calenderFocused) => {
        this.setState(() => ({ calenderFocused }))
    }

    render() {
        return (
            <div>
                <input 
                    type="text" 
                    value={this.props.filters.text} 
                    onChange={(e) => (
                        this.props.dispatch(setTextFilter(e.target.value))
                    )}
                 />
                <select 
                    value={this.props.filters.text}
                    onChange={(e) => {
                        if (e.target.value === "date") {
                            this.props.dispatch(sortByDate())
                        } else if (e.target.value === "amount") {
                            this.props.dispatch(sortByAmount())
                        }
                    }}
                >
                    <option value="date">Date</option>
                    <option value="amount">Amount</option>
                </select>
                <DateRangePicker
                    startDate={this.props.filters.startDate} 
                    startDateId={uuid()}
                    endDate={this.props.filters.endDate} 
                    endDateId={uuid()}
                    onDatesChange={this.onDatesChange} 
                    focusedInput={this.state.calenderFocused} 
                    onFocusChange={this.onFocusChange} 
                    showClearDates={true}
                    numberOfMonths={1}
                    isOutsideRange={() => false}
                />
            </div>
        )
    }
} 

// Reading from the store
const mapStateToProps = (state) => ({
    filters: state.filters
})

export default connect(mapStateToProps)(ExpenseListFilters)