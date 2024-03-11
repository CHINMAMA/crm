import React, { useCallback, useState } from 'react'
import { 
    useAddAppointmentMutation,
    useDeleteAppointmentMutation,
    useGetGymsQuery,
    useGetAppointmentsQuery,
    useGetTrainersQuery,
    useUpdateAppointmentMutation,
    useGetGymsByOwnerQuery,
    useGetGymTrainersByGymsQuery,
} from '../../../services/scheduleService';
import CustomStore from 'devextreme/data/custom_store';
import Scheduler, { View } from 'devextreme-react/cjs/scheduler';
import 'devextreme/dist/css/dx.light.css'
import { useOutletContext } from 'react-router-dom';
import Appointment from './appointment';

const Schedule = () => {
    const { userInfo } = useOutletContext()
    const [currentDate, setCurrentDate] = useState(new Date())
    const handlePropertyChange = useCallback((e) => {
        if(e.name === 'currentDate') {
            setCurrentDate(e.value);
        }
    }, [])
    const { id: userId, role } = userInfo ?? {id: undefined, role: undefined}
    const isOwner = (role === 'GYM OWNER')

    //Get appointments
    const { data: appointments } = useGetAppointmentsQuery(
        { userId, role },
        { skip: !userInfo }
    )
    
    //Get gyms if trainer
    const gymsId = appointments?.map((item) => item.gymId)
    const { data: gyms_t } = useGetGymsQuery(gymsId, { skip: isOwner || !gymsId })
    //Get gyms if owner
    const { data: gyms_o } = useGetGymsByOwnerQuery(userId, { skip: !isOwner || !userInfo})

    const gyms = isOwner ? gyms_o : gyms_t
    
    //Get gym-trainer relationships
    const { data: gymTrainer_o } = useGetGymTrainersByGymsQuery(gyms?.map(item => item.id), {skip: !isOwner || !gyms})
    const { data: gymTrainer_t } = useGetGymTrainersByGymsQuery(gymsId, {skip: isOwner})

    const gymTrainer = isOwner ? gymTrainer_o : gymTrainer_t
    //Get trainers if trainer
    const { data: trainers } = useGetTrainersQuery(
        gymTrainer
            ?.filter(item => item.status === 'accepted')
            ?.map(item => item.trainerId),
        {skip: !gymTrainer}
    )

    const [currentGym, setCurrentGym] = useState(gyms ? gyms[0]?.id : undefined)

    const [addAppointment] = useAddAppointmentMutation()
    const [deleteAppointment] = useDeleteAppointmentMutation()
    const [updateAppointment] = useUpdateAppointmentMutation()
    
    
    // Custom store
    const dataSource = new CustomStore({
        key: "id",
        load: () => appointments,
        update: (id, appointmentData) => {
            return updateAppointment({id, appointmentData}).unwrap()
                .then(() => {})
                .catch((err) => { throw 'Network error' })
        },
        insert: (appointmentData) => {
            console.log("values in store insert: ", appointmentData);
            return addAppointment({userId, appointmentData}).unwrap()
                .then(() => {})
                .catch((err) => { throw 'Network error' })
        },
        remove: (id) => {
            return deleteAppointment(id).unwrap()
                .then(() => {})
                .catch((err) => { throw 'Network error' })
        },
    })

    // Appointment form
    const onAppointmentFormOpening = (e) => {
        let gymId = e.appointmentData.gymId
        const getTrainers = gymId => 
        trainers.filter(
            trainer => {
                console.log(gymId, trainer, gymTrainer);
                const temp = gymTrainer.filter(
                    rel =>
                        rel.gymId === gymId
                ).map(item => { return item.trainerId})
                return temp.includes(trainer.id)
            }
        )
        e.popup.option('showTitle', true);
        e.popup.option('title', 
            e.appointmentData.text ? 
            e.appointmentData.text : 
            'Create a new training');
        e.form.option('items', [
            {
                label: {
                    text: 'Gym'
                },
                editorType: 'dxSelectBox',
                dataField: 'gymId',
                editorOptions: {
                    onValueChanged(args) {
                        gymId = args.value
                        e.form.option(
                            'items[1].editorOptions.items', 
                            getTrainers(gymId)
                        )
                    },
                    readOnly: isOwner ? false : true,
                    items: gyms,
                    displayExpr: 'name',
                    valueExpr: 'id',
                }
            },
            {
                label: {
                    text: "Trainer"
                },
                name: 'trainers',
                editorType: 'dxSelectBox',
                dataField: 'trainerId',
                editorOptions: {
                    readOnly: isOwner ? false : true,
                    items: getTrainers(gymId),
                    displayExpr: (item) => item && item.firstName + ' ' + item.lastName,
                    valueExpr: 'id',
                }
            },
            {
                name: 'startDate',
                dataField: 'startDate',
                editorType: 'dxDateBox',
                editorOptions: {
                    readOnly: isOwner ? false : true,
                    width: '100%',
                    type: 'datetime',
                },
            },
            {
                name: 'endDate',
                dataField: 'endDate',
                editorType: 'dxDateBox',
                editorOptions: {
                    readOnly: isOwner ? false : true,
                    width: '100%',
                    type: 'datetime',
                },
            }
        ])
    }
    return (
        <Scheduler
            onAppointmentFormOpening={onAppointmentFormOpening}
            onOptionChanged={handlePropertyChange}
            currentDate={currentDate}
            dataSource={dataSource}
            currentView='week'
            appointmentComponent={Appointment}
            startDayHour={9}
            endDayHour={23}
            height='100%'
            width='100%'
            firstDayOfWeek={1}
        >

        </Scheduler>
  )
}

export default Schedule