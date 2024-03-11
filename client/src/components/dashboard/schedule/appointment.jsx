import React from 'react';
import { formatDate } from 'devextreme/localization';
import { useGetGymQuery } from '../../../services/scheduleService';
import { useGetUserDetailsQuery } from '../../../services/authService';

const Appointment = (props) => {
    const { targetedAppointmentData } = props.data;

    const { gymId, trainerId } = targetedAppointmentData;
    const { data: gymInfo } = useGetGymQuery(gymId, { skip: !gymId })
    const { data: trainerInfo } = useGetUserDetailsQuery(trainerId, { skip: !trainerId })
    console.log(gymInfo, trainerInfo);
    return (
        <div>
            <div> <strong>{ gymInfo?.name }</strong> </div>
            <div> { trainerInfo?.firstName + ' ' + trainerInfo?.lastName }</div>
            <div>
                { formatDate(targetedAppointmentData.displayStartDate, 'shortTime') }
                {' - '}
                { formatDate(targetedAppointmentData.displayEndDate, 'shortTime') }
            </div>
        </div>
    );
};
export default Appointment;