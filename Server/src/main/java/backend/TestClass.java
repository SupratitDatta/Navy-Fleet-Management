package backend;


import java.util.ArrayList;
import java.util.List;

public class TestClass {
    public static void main(String[] args) {
        List<Integer> ls = new ArrayList<>();
        ls.add(1);
        ls.add(2);
        System.out.println(ls);
        ls.remove(1); //index of value / object
        System.out.println(ls);
    }
}
