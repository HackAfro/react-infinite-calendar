import React, { PureComponent } from 'react';
import classNames from 'classnames';
import parse from 'date-fns/parse';
import styles from './Day.scss';

export default class Day extends PureComponent {
  handleClick = () => {
    let { date, isDisabled, onClick, events, eventToggled } = this.props;

    if (!isDisabled && typeof onClick === 'function') {
      onClick(parse(date));
      if (events.length) eventToggled(events, date);
    }
  };

  renderSelection(selectionColor) {
    const {
      day,
      date,
      isToday,
      locale: { todayLabel },
      monthShort,
      theme: { textColor },
      selectionStyle,
      isSelected,
      events,
    } = this.props;

    return (
      <div
        className={styles.selection}
        data-date={date}
        style={{
          backgroundColor: events.length
            ? this.getBackgroundColor(events)
            : this.selectionColor,
          color: textColor.active,
          ...(isSelected && !events.length && { selectionStyle }),
        }}
      >
        {(isSelected || !!events.length || isToday) && (
          <span className={styles.month}>
            {isToday ? todayLabel.short || todayLabel.long : monthShort}
          </span>
        )}
        <span className={styles.day}>{day}</span>
      </div>
    );
  }

  getBackgroundColor(events) {
    const unToggledEvents = events.filter((event) => !event.toggled);
    const toggledEvents = events.filter((event) => event.toggled);
    // since I couldn't achieve half colors, I chose another color to achieve that goal
    const color =
      unToggledEvents.length === events.length
        ? 'rgb(85, 159, 255)'
        : toggledEvents.length === events.length
          ? '#e3385a'
          : 'purple';
    return color;
  }

  render() {
    const {
      className,
      currentYear,
      date,
      day,
      handlers,
      isDisabled,
      isHighlighted,
      isToday,
      isSelected,
      monthShort,
      events,
      theme: { selectionColor, todayColor },
      year,
    } = this.props;
    let color;

    if (isSelected || events.length) {
      color = this.selectionColor =
        typeof selectionColor === 'function'
          ? selectionColor(date)
          : selectionColor;
    } else if (isToday) {
      color = todayColor;
    }

    const inlineStyles = {
      ...(color && { color }),
    };

    return (
      <li
        style={inlineStyles}
        className={classNames(
          styles.root,
          {
            [styles.today]: isToday,
            [styles.highlighted]: isHighlighted,
            [styles.selected]: isSelected || events.length,
            [styles.disabled]: isDisabled,
            [styles.enabled]: !isDisabled,
          },
          className
        )}
        onClick={this.handleClick}
        data-date={date}
        {...handlers}
      >
        {day === 1 && <span className={styles.month}>{monthShort}</span>}
        {isToday ? <span>{day}</span> : day}
        {day === 1 &&
          currentYear !== year && <span className={styles.year}>{year}</span>}
        {(isSelected || !!events.length) && this.renderSelection()}
      </li>
    );
  }
}
