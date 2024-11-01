import com.fasterxml.jackson.databind.ObjectMapper;
import javax.xml.bind.JAXBContext;
import javax.xml.bind.Unmarshaller;
import java.io.StringReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.List;

//deserializaçao de JSON e XML
public class Client {
    private static ObjectMapper jsonMapper = new ObjectMapper();

    public static List<Customer> fetchCustomersAsJson(String urlStr) throws Exception {
        URL url = new URL(urlStr);
        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
        conn.setRequestMethod("GET");
        conn.setRequestProperty("Accept", "application/json");

        List<Customer> customers = jsonMapper.readValue(conn.getInputStream(), List.class);
        conn.disconnect();

        return customers;
    }

    public static List<Customer> fetchCustomersAsXml(String urlStr) throws Exception {
        URL url = new URL(urlStr);
        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
        conn.setRequestMethod("GET");
        conn.setRequestProperty("Accept", "application/xml");

        JAXBContext context = JAXBContext.newInstance(Customer.class);
        Unmarshaller unmarshaller = context.createUnmarshaller();
        List<Customer> customers = (List<Customer>) unmarshaller.unmarshal(conn.getInputStream());
        conn.disconnect();

        return customers;
    }

    public static void main(String[] args) throws Exception {
        // URL do endpoint em JSON
        // URL em XML
        String jsonUrl = "http://localhost:8080/customers/json"; 
        String xmlUrl = "http://localhost:8080/customers/xml";   

        List<Customer> customersJson = fetchCustomersAsJson(jsonUrl);
        List<Customer> customersXml = fetchCustomersAsXml(xmlUrl);

        System.out.println("JSON Customers: " + customersJson);
        System.out.println("XML Customers: " + customersXml);
    }
}
