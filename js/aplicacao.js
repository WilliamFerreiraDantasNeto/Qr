async function loadData() {

    const {data, error} = await _supabase.from("users").select();

    console.table(data);
    console.log(error);

}

loadData()