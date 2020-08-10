const Database = require('./db')
const createProffy =require('./createProffy')


Database.then(async (db) => {
    //inserir dados
    proffyValue = {
            name: 'Gabriel',
            avatar: 'https://avatars3.githubusercontent.com/u/68795815?s=460&v=4',
            whatsapp: '998883333',
            bio: 'Instrutor'
    }

    classValue = {
            subject: 1,
            cost: '100',
            //proffy id pelo db
    }

    classScheduleValues = [
        //class_id pelo db
        {
            weekday: 1,
            time_from: 720,
            time_to: 1120
        },
        {
            weekday: 0,
            time_from: 420,
            time_to: 120
        }
    ]

    await createProffy(db, {proffyValue, classValue, classScheduleValues})

    //consultar dados

    //todos os proffys
    const selectedProffys = await db.all("SELECT * FROM proffys")
    //console.log(selectedProffys)

    //consultar classes de um proffy
    //trazer dados do proffy
    const selectClassesAndProffys = await db.all(`
        SELECT classes.*, proffys.*
        FROM proffys
        JOIN classes ON (classes.proffy_id = proffys.id)
        WHERE classes.proffy_id = 1;
    `)
    // console.log(selectClassesAndProffys)

    //pessoa trabalha 8 -18
    //time_from <= time_from solicitado
    //time_to > time solicitado
    const selectClassesSchedules = await db.all(`
        SELECT class_schedule.*
        FROM class_schedule
        WHERE class_schedule.class_id = "1"
        AND class_schedule.weekday = "1"
        AND class_schedule.time_from <= "520"
        AND class_schedule.time_to > "20"
    `)

    // console.log(selectClassesSchedules)

})