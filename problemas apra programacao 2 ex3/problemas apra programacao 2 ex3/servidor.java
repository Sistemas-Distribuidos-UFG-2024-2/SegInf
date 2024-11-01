import com.fasterxml.jackson.databind.ObjectMapper;
import javax.xml.bind.JAXBContext;
import javax.xml.bind.Marshaller;
import java.io.StringWriter;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

//modelo de dados
public class Customer {
    public int id;
    public String name;
    public String email;

    // construtor, getters, setters
}

//conexao ao database
class Database {
    public static Connection getConnection() throws SQLException {
        String url = "jdbc:mysql://localhost:3306/xdr_example";
        String user = "root";
        //crie uma senha
        String password = "password"; 
        return DriverManager.getConnection(url, user, password);
    }

    public static List<Customer> getCustomers() throws SQLException {
        List<Customer> customers = new ArrayList<>();
        Connection conn = getConnection();
        String query = "SELECT * FROM Customer";
        Statement stmt = conn.createStatement();
        ResultSet rs = stmt.executeQuery(query);

        while (rs.next()) {
            Customer customer = new Customer();
            customer.id = rs.getInt("id");
            customer.name = rs.getString("name");
            customer.email = rs.getString("email");
            customers.add(customer);
        }

        rs.close();
        stmt.close();
        conn.close();

        return customers;
    }
}

//servidor para respostas em JSON e XML
public class Server {
    private static ObjectMapper jsonMapper = new ObjectMapper();

    public static String getCustomersAsJson() throws Exception {
        List<Customer> customers = Database.getCustomers();
        return jsonMapper.writeValueAsString(customers);
    }

    public static String getCustomersAsXml() throws Exception {
        List<Customer> customers = Database.getCustomers();
        JAXBContext context = JAXBContext.newInstance(Customer.class);
        Marshaller marshaller = context.createMarshaller();
        StringWriter writer = new StringWriter();
        marshaller.marshal(customers, writer);
        return writer.toString();
    }

    public static void main(String[] args) throws Exception {
        System.out.println("JSON Response:\n" + getCustomersAsJson());
        System.out.println("XML Response:\n" + getCustomersAsXml());
    }
}
