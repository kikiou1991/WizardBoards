"use client";
import Icon from "@/components/Icons";
// import CalendarFrame from "@/components/calendar/Calendar";
import React, { useState } from "react";

const Calendar = () => {
  return (
    <section className="w-[500px] text-foreground">
      <div className="flex justify-start gap-2 items-center mx-4">
        <Icon name="calendar" classname="w-6 h-6" />
        <h2 className="text-2xl font-semibold py-3">Calendar</h2>
      </div>
      <div>{/* <CalendarFrame /> */}</div>
    </section>
  );
};

export default Calendar;
