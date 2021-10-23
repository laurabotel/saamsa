package main.java.saamsa.java;
import org.apache.kafka.clients.admin.AdminClient;
import org.apache.kafka.clients.admin.NewTopic;
import org.apache.kafka.clients.admin.AdminClientConfig;
import org.apache.kafka.clients.admin.CreateTopicsResult;
import org.apache.kafka.clients.admin.DescribeTopicsResult;

import java.util.ArrayList;
import java.util.Properties;
import java.util.concurrent.ExecutionException;

public class createTopic {
    
    public static void main(String[] args) throws InterruptedException, ExecutionException {
        if (args.length > 2) {
        Properties properties = new Properties();
        properties.put(AdminClientConfig.BOOTSTRAP_SERVERS_CONFIG, args[0]);
        AdminClient admin = AdminClient.create(properties);
        ArrayList topicList = new ArrayList();
        NewTopic newTopic = new NewTopic(args[1]+ "_balanced", Integer.parseInt(args[2]), (short) 1);
        topicList.add(newTopic);
        ArrayList stringTopicList = new ArrayList();
        stringTopicList.add(args[1]+"_balanced");

        try {
            DescribeTopicsResult result = admin.describeTopics(stringTopicList);
            result.all().get();
        }
        catch (Exception e){
            CreateTopicsResult result = admin.createTopics(topicList);
            result.all().get();
            System.out.println("bonjour you poopoo head");
        }
        finally {
            admin.close();
        }
        }
    }
}
