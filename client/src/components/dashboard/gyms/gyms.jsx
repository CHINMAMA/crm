import React, { useRef } from 'react'
import { useOutletContext } from 'react-router-dom'
import { 
    useAddGymMutation, 
    useAddTrainerToGymMutation, 
    useDeleteGymMutation, 
    useDeleteGymTrainersByGymMutation, 
    useGetAllGymsQuery, 
    useGetAllTrainersQuery, 
    useGetGymTrainersByTrainersQuery, 
    useGetGymsByOwnerQuery, 
    useGetGymsQuery,
    useUpdateGymMutation
} from '../../../services/scheduleService'
import { ButtonItem, Form, GroupItem, Label, SimpleItem } from 'devextreme-react/form'
import TabPanel, { Item } from 'devextreme-react/tab-panel'
import { Popup, Position, ToolbarItem } from 'devextreme-react/popup'
import DataSource from 'devextreme/data/data_source'
import CustomStore from 'devextreme/data/custom_store'
import { useState } from 'react'
import notify from 'devextreme/ui/notify';
import s from './gyms.module.css'

const Gyms = () => {
    const editForm = useRef(null)
    const { userInfo } = useOutletContext()
    const is_owner = userInfo?.role === 'GYM OWNER'
    const { data: gymTrainer } = useGetGymTrainersByTrainersQuery(
        [userInfo?.id],
        { skip: is_owner || !userInfo }
    )
    const { data: gyms_o } = useGetGymsByOwnerQuery(
        userInfo?.id,
        {skip: !is_owner || !userInfo}
    )
    let { data: allGyms } = useGetAllGymsQuery({ skip: is_owner })
    
    const { data: gyms_t } = useGetGymsQuery(
        gymTrainer?.map(rel => rel.status === 'accepted' && rel.gymId),
        { skip: is_owner || !gymTrainer }
    )
    const outcoming = !is_owner && gymTrainer?.filter(rel => rel.status === 'sent')
    const requestSentGyms = !is_owner && allGyms?.filter(gym => outcoming.map(rel => rel.gymId).includes(gym.id))
    const gyms = is_owner ? gyms_o : gyms_t
    allGyms = !is_owner && allGyms?.filter(gym => !gymTrainer?.map(rel => rel.gymId)?.includes(gym.id))

    const [addGym] = useAddGymMutation()
    const [addTrainerToGym] = useAddTrainerToGymMutation()
    const [updateGym] = useUpdateGymMutation()
    const [deleteGym] = useDeleteGymMutation()
    const [deleteGymTrainers] = useDeleteGymTrainersByGymMutation()
    const [currentGymId, setCurrentGymId] = useState()
    const [gymName, setGymName] = useState('')
    const [gymCountry, setGymCountry] = useState('')
    const [gymCity, setGymCity] = useState('')
    const [gymStreetAddress, setGymStreetAddress] = useState('')
    const [popupVisible, setPopupVisible] = useState(false);
    const [currentGymPopup, setCurrentGymPopup] = useState();

    const { data: trainers } = useGetAllTrainersQuery({skip: !is_owner})
    
    const tagBoxDataSource = is_owner ? new DataSource({
        store: new CustomStore({
            loadMode: 'raw',
            load: () => trainers
        }),
        key: 'id',
        paginate: true,
        pageSize: 10
    }) : undefined

    const handleAddSubmit = (e) => {
        e.preventDefault();
        if (!userInfo) return
        
        addGym({userId: userInfo.id, gymData: {
            name: gymName,
            country: gymCountry,
            city: gymCity,
            streetAddress: gymStreetAddress
        }}).then(res => {
            const trainersId = new Array()
            e.target.querySelectorAll('form option').forEach(item => trainersId.push(parseInt(item.value)))
            trainersId.forEach(trainerId => addTrainerToGym({gymId: res.data.id, trainerId}))
            notify({
                message: 'Gym successfuly added',
                position: {
                  my: 'center top',
                  at: 'center top',
                },
              }, 'success', 3000);
        }).catch(err => {
            notify({
                message: err,
                position: {
                  my: 'center top',
                  at: 'center top',
                },
              }, 'error', 3000);
        })
    }

    const handleEditSubmit = (e) => {
        e.preventDefault();
        if (!userInfo || !currentGymId) return
        function Gym(name, country, city, streetAddress) {
            name && (this.name = name)
            country && (this.country = country)
            city && (this.city = city)
            streetAddress && (this.streetAddress = streetAddress)
        }
        updateGym({id: currentGymId, gymData: new Gym(
            gymName,
            gymCountry,
            gymCity,
            gymStreetAddress
        )}).then(() => {
            notify({
                message: 'Gym successfuly updated',
                position: {
                  my: 'center top',
                  at: 'center top',
                },
              }, 'success', 3000);
        }).catch(err => {
            notify({
                message: err,
                position: {
                  my: 'center top',
                  at: 'center top',
                },
              }, 'error', 3000);
        })
    }
    const handleDeleteSubmit = (e) => {
        e.preventDefault();
        if (!userInfo || !currentGymId) return
        
        deleteGym(currentGymId).then(() => {
            deleteGymTrainers(currentGymId).then(() => {
                notify({
                    message: 'Gym successfuly deleted',
                    position: {
                    my: 'center top',
                    at: 'center top',
                    },
                }, 'success', 3000);
            }).catch(err => {throw err})
        }).catch(err => {
            notify({
                message: err,
                position: {
                  my: 'center top',
                  at: 'center top',
                },
              }, 'error', 3000);
        })
    }

    const handleSendSubmit = (e) => {
        e.preventDefault();
        if (!userInfo) return
        
        addTrainerToGym({gymId: currentGymId, trainerId: userInfo.id}).then(res => {
            notify({
                message: 'Request successfuly sent',
                position: {
                  my: 'center top',
                  at: 'center top',
                },
              }, 'success', 3000);
        }).catch(err => {
            notify({
                message: err,
                position: {
                  my: 'center top',
                  at: 'center top',
                },
              }, 'error', 3000);
        })
    }

    return (
        is_owner ?
        <TabPanel width='100%'>
            <Item title='New gym'>
                <form onSubmit={handleAddSubmit}>
                    <Form>
                        <SimpleItem
                            editorType="dxTextArea"
                            editorOptions={{
                                onChange: (e) => {setGymName(e.event.currentTarget.value);}
                            }}
                            validationRules={[{type: 'required'}]}
                        >
                            <Label text='Gym name'/>
                        </SimpleItem>
                        <GroupItem
                            caption="Address"
                        >
                            <SimpleItem
                                editorType="dxTextArea"
                                editorOptions={{
                                    onChange: (e) => {setGymCountry(e.event.currentTarget.value);}
                                }}
                                validationRules={[{type: 'required'}]}
                            >
                                <Label text='Country'/>
                            </SimpleItem>
                            <SimpleItem
                                editorType="dxTextArea"
                                editorOptions={{
                                    onChange: (e) => {setGymCity(e.event.currentTarget.value);}
                                }}
                                validationRules={[{type: 'required'}]}
                            >
                                <Label text='City'/>
                            </SimpleItem>
                            <SimpleItem
                                editorType="dxTextArea"
                                editorOptions={{
                                    onChange: (e) => {setGymStreetAddress(e.event.currentTarget.value);}
                                }}
                                validationRules={[{type: 'required'}]}
                            >
                                <Label text='Street Address'/>
                            </SimpleItem>                                                        
                        </GroupItem>
                        <SimpleItem
                            editorType='dxTagBox'
                            editorOptions={{
                                dataSource: tagBoxDataSource,
                                displayExpr: (item) => item && item.firstName + ' ' + item.lastName + ' ' + item.email,
                                searchEnabled: true,
                                valueExpr: 'id',
                            }}
                        >
                            <Label text='Select trainers'/>
                        </SimpleItem>
                        <ButtonItem
                            buttonOptions={{
                                text: 'Submit',
                                type: 'default',
                                useSubmitBehavior: true
                            }}
                        />
                    </Form>
                </form>
            </Item>
            <Item title='Edit gym'>
                <form onSubmit={handleEditSubmit}>
                    <Form ref={editForm}>
                        <SimpleItem
                            editorType='dxSelectBox'
                            name='Gyms'
                            editorOptions={{
                                onValueChanged(args) {
                                    setCurrentGymId(args.value)
                                    const { 
                                        name, 
                                        country, 
                                        city, 
                                        streetAddress 
                                    } = gyms.filter(gym => gym.id === args.value)[0];
                                    editForm.current.instance.updateData('name', name);
                                    editForm.current.instance.updateData('country', country);
                                    editForm.current.instance.updateData('city', city);
                                    editForm.current.instance.updateData('streetAddress', streetAddress );
                                }, 
                                items: gyms,
                                displayExpr: 'name',
                                valueExpr: 'id',
                            }}
                        >
                            <Label text='Select your gym'/>
                        </SimpleItem>
                        <SimpleItem
                            editorType="dxTextArea"
                            name='name'
                            editorOptions={{
                                onChange: (e) => {setGymName(e.event.currentTarget.value)}
                            }}
                        >
                            <Label text='Gym name'/>
                        </SimpleItem>
                        <GroupItem
                            caption="Address"
                        >
                            <SimpleItem
                                name='country'
                                editorType="dxTextArea"
                                editorOptions={{
                                    onChange: (e) => {setGymCountry(e.event.currentTarget.value);}
                                }}
                            >
                                <Label text='Country'/>
                            </SimpleItem>
                            <SimpleItem
                                name='city'
                                editorType="dxTextArea"
                                editorOptions={{
                                    onChange: (e) => {setGymCity(e.event.currentTarget.value);}
                                }}
                            >
                                <Label text='City'/>
                            </SimpleItem>
                            <SimpleItem
                                name='streetAddress'
                                editorType="dxTextArea"
                                editorOptions={{
                                    onChange: (e) => {setGymStreetAddress(e.event.currentTarget.value);}
                                }}
                            >
                                <Label text='Street Address'/>
                            </SimpleItem>                                                        
                        </GroupItem>
                        <ButtonItem
                            buttonOptions={{
                                text: 'Submit',
                                type: 'default',
                                useSubmitBehavior: true
                            }}
                        />
                    </Form>
                </form>
            </Item>
            <Item title='Delete gym'>
                <form onSubmit={handleDeleteSubmit}>
                    <Form>
                        <SimpleItem
                            editorType='dxSelectBox'
                            name='Gyms'
                            editorOptions={{
                                onValueChanged(args) {
                                    setCurrentGymId(args.value)
                                }, 
                                items: gyms,
                                displayExpr: 'name',
                                valueExpr: 'id',
                            }}
                            validationRules={[{type: 'required'}]}
                        >
                            <Label text='Select your gym'/>
                        </SimpleItem>
                        <ButtonItem
                            buttonOptions={{
                                text: 'Delete',
                                type: 'default',
                                useSubmitBehavior: true
                            }}
                        />
                    </Form>
                </form>
            </Item>
        </TabPanel>
        :
        <TabPanel height='100%'>
            <Item title="Gyms you're working for">
                <ul className={s.list}>
                    {
                        gyms && gyms.map(
                            gym => 
                            <li key={gym.id}>
                                <button className={s.popupGymButton} onClick={(e) => {
                                    setPopupVisible(true)
                                    setCurrentGymPopup(gyms?.filter(it => it.id === gym.id)[0])
                                }}>
                                {gym.name}
                                </button>
                            </li>
                        )
                    }
                </ul>
                <Popup
                    visible={popupVisible}
                    dragEnabled={false}
                    hideOnOutsideClick={true}
                    showCloseButton={false}
                    showTitle={true}
                    onHiding={()=>setPopupVisible(false)}
                    title="Gym information"
                    container="body"
                    width={300}
                    height={280}
                >
                    <Position
                        at="center"
                        my="center"
                        collision="fit"
                    />
                    <p style={{fontSize: '1.4rem'}}>
                        <strong>{currentGymPopup?.name}</strong>
                    </p>
                    <div>
                        <p style={{fontSize: '1.2rem'}}>
                            Address
                        </p>
                        <div>
                            {currentGymPopup?.country}
                        </div>
                        <div>
                            {currentGymPopup?.city}
                        </div>
                        <div>
                            {currentGymPopup?.streetAddress}
                        </div>
                    </div>
                </Popup>
            </Item>
            <Item title='Send request to gym'>
                <form onSubmit={handleSendSubmit}>
                    <Form>
                        <SimpleItem
                            editorType='dxSelectBox'
                            name='Gyms'
                            editorOptions={{
                                onValueChanged(args) {
                                    setCurrentGymId(args.value)
                                }, 
                                items: allGyms,
                                displayExpr: 'name',
                                valueExpr: 'id',
                            }}
                            validationRules={[{type: 'required'}]}
                        >
                            <Label text='Select gym'/>
                        </SimpleItem>
                        <ButtonItem
                            buttonOptions={{
                                text: 'Send',
                                type: 'default',
                                useSubmitBehavior: true
                            }}
                        />
                    </Form>
                </form>
            </Item>
            <Item title='Outcoming requests'>
                <div style={{display: 'flex'}} className={s.requestsContainer}>
                    <ul className={s.list}>
                        { 
                            requestSentGyms?.map(gym => (
                                <li className={s.request} key={gym.id}>
                                    {gym.name}
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </Item>
        </TabPanel>
    )
}

export default Gyms