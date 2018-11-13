var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

function saveToJSON(data,id)
{
  var fs = require("fs");
  var now = new Date;
  const outputFilename = `export/${id}.json`;
    
  fs.writeFile(outputFilename, data, (err) => {
    if (err) {
        console.error(err);
        return;
    };
    console.log("File has been created");
    });
}

function getInstitutionListByPageNumber(pageNumber)
{
    
    const Http = new XMLHttpRequest();
    var url='https://api.data.gov/ed/collegescorecard/v1/schools.json?fields=id&api_key=fOmdUI7bGDMXqQi9o5h1ToFEhVylxUNOmyHbN2Yp&page=[pageNumber]';
    url = url.replace('[pageNumber]', pageNumber);
    Http.open("GET", url);
    Http.send();
    Http.onreadystatechange=function(){
        if (this.readyState==4){ 
            for (result of JSON.parse(Http.responseText).results) {
                getInstitutionByID(result.id);
            }
        }
    }
}

function getInstitutionByID(id)
{
    const Http = new XMLHttpRequest();
    var url='https://api.data.gov/ed/collegescorecard/v1/schools.json?id=[0]&fields=id,location.lon,location.lat,school.name,school.city,school.state,school.zip,school.accreditor,school.school_url,school.price_calculator_url,school.degrees_awarded.predominant_recoded,school.under_investigation,school.main_campus,school.branches,school.degrees_awarded.predominant,school.degrees_awarded.highest,school.ownership,school.state_fips,school.region_id,school.locale,school.degree_urbanization,school.carnegie_basic,school.carnegie_undergrad,school.carnegie_size_setting,school.minority_serving.historically_black,school.minority_serving.predominantly_black,school.minority_serving.annh,school.minority_serving.tribal,school.minority_serving.aanipi,school.minority_serving.hispanic,school.minority_serving.nant,school.men_only,school.women_only,school.religious_affiliation,school.online_only,school.operating,school.tuition_revenue_per_fte,school.instructional_expenditure_per_fte,school.faculty_salary,school.ft_faculty_rate,school.alias,school.institutional_characteristics.level,school.open_admissions_policy,school.accreditor_code,school.title_iv.approval_date&api_key=fOmdUI7bGDMXqQi9o5h1ToFEhVylxUNOmyHbN2Yp';
    url = url.replace('[0]', id);
    Http.open("GET", url);
    Http.send();
    Http.onreadystatechange=function(){
        if (this.readyState==4){ 
            saveToJSON(Http.responseText, id);
        }
    }
}

function run(recordCount, pageLimit)
{
    for (var i = 0; i < (recordCount / pageLimit); i++){
        getInstitutionListByPageNumber(i);
    }
}
run(35,20);
//run(7180,20);
//getInstitutionByID(182917);